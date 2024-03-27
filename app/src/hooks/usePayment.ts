import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, Timestamp, runTransaction } from "firebase/firestore";
// Services
import { auth, db } from "../services/firebase";
// Types
import { Payment } from "../types/payment";
// Utils
import { formatDateInput } from "../utils/formatDate";

export function usePayment() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [user] = useAuthState(auth);

  const [newPayment, setNewPayment] = useState({
    id: Date.now(),
    amount: 0,
    payment: "",
    type: "",
    dateReceived: null,
    dueDate: null,
    isPaid: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dateReceived" || name === "dueDate") {
      const date = new Date(value);

      setNewPayment((prevState) => ({
        ...prevState,
        [name]: Timestamp.fromDate(date),
      }));
    } else {
      setNewPayment((prevState) => ({
        ...prevState,
        [name]: name === "amount" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const documentRef = doc(db, "collection", "document");

      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(documentRef);

        if (document.exists()) {
          let usersArray = document.data().users;
          const userIndex = usersArray.findIndex(
            (u: { id: string }) => u.id === user.uid
          );

          if (userIndex === -1) {
            const newUser = {
              id: user.uid,
              payments: [newPayment],
            };
            usersArray = [...usersArray, newUser];
          } else {
            const updatedPayments = Array.isArray(
              usersArray[userIndex].payments
            )
              ? [...usersArray[userIndex].payments, newPayment]
              : [newPayment];
            usersArray[userIndex] = {
              ...usersArray[userIndex],
              payments: updatedPayments,
            };
          }

          transaction.update(documentRef, { users: usersArray });
        }
      });

      setNewPayment({
        id: Date.now(),
        amount: 0,
        payment: "",
        type: "",
        dateReceived: null,
        dueDate: null,
        isPaid: false,
      });
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  const handleDelete = async (billId: number) => {
    if (!user) return;

    const documentRef = doc(db, "collection", "document");
    try {
      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(documentRef);

        if (document.exists()) {
          const usersArray = document.data().users;
          const userIndex = usersArray.findIndex(
            (u: { id: string }) => u.id === user.uid
          );
          if (userIndex !== -1) {
            const updatedPayments = usersArray[userIndex].payments.filter(
              (bill: { id: number }) => bill.id !== billId
            );

            const updatedUsers = [...usersArray];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              payments: updatedPayments,
            };

            transaction.update(documentRef, { users: updatedUsers });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  // Effects
  useEffect(() => {
    const unsubscribe = user
      ? onSnapshot(doc(db, "collection", "document"), (document) => {
          if (document.exists()) {
            const usersArray = document.data().users;
            const loggedInUser = usersArray.find(
              (u: { id: string }) => u.id === user.uid
            );
            if (loggedInUser && loggedInUser.payments) {
              setPayments(loggedInUser.payments);
            }
          }
        })
      : () => {};

    return () => unsubscribe();
  }, [user]);

  const calculateRemainingDays = (dueDate: Timestamp) => {
    const currentDate = new Date();
    const dateExpiryObj = new Date(dueDate.seconds * 1000);
    const differenceInTime = dateExpiryObj.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays > 0) {
      // If the due date is in the future
      return `in ${differenceInDays} days`;
    } else if (differenceInDays < 0) {
      // If the due date has passed
      return `${Math.abs(differenceInDays)} days ago`;
    } else {
      // If today is the due date
      return "Today";
    }
  };

  return {
    newPayment,
    setNewPayment,
    payments,
    handleInputChange,
    formatDateInput,
    handleSubmit,
    handleDelete,
    calculateRemainingDays,
  };
}

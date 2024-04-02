import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, Timestamp, runTransaction } from "firebase/firestore";
// Services
import { auth, db } from "../services/firebase";
// Types
import { Payment } from "../types/payment";
// Utils
import { formatDateInput } from "../utils/formatDate";
import { sanitize } from "../utils/sanitize";

export function useBillsPayments() {
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
      if (name === "payment" || name === "type") {
        const sanitizeValue = sanitize(value);
        if (sanitizeValue !== null) {
          setNewPayment((prevState) => ({
            ...prevState,
            [name]: sanitizeValue,
          }));
        } else {
          console.error("Invalid input.");
        }
      } else {
        setNewPayment((prevState) => ({
          ...prevState,
          [name]: name === "amount" ? Number(value) : value,
        }));
      }
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
            const handleUpdates = Array.isArray(usersArray[userIndex].payments)
              ? [...usersArray[userIndex].payments, newPayment]
              : [newPayment];
            usersArray[userIndex] = {
              ...usersArray[userIndex],
              payments: handleUpdates,
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
            const handleUpdates = usersArray[userIndex].payments.filter(
              (bill: { id: number }) => bill.id !== billId
            );

            const updatedUsers = [...usersArray];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              payments: handleUpdates,
            };

            transaction.update(documentRef, { users: updatedUsers });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  const handleUpdate = async (paymentId: number, isPaid: unknown) => {
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
            const paymentIndex = usersArray[userIndex].payments.findIndex(
              (p: { id: number }) => p.id === paymentId
            );
            if (paymentIndex !== -1) {
              usersArray[userIndex].payments[paymentIndex].isPaid = isPaid;
              transaction.update(documentRef, { users: usersArray });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

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
      return `in ${differenceInDays} days`;
    } else if (differenceInDays < 0) {
      return `${Math.abs(differenceInDays)} days ago`;
    } else {
      return "Today";
    }
  };

  const togglePaymentStatus = async (paymentId: number, newStatus: boolean) => {
    const handleUpdates = payments.map((payment) => {
      if (payment.id === paymentId) {
        return { ...payment, isPaid: newStatus };
      }
      return payment;
    });
    setPayments(handleUpdates);
    await handleUpdate(paymentId, newStatus);
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
    togglePaymentStatus,
  };
}

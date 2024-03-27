import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, Timestamp, runTransaction } from "firebase/firestore";
// Services
import { auth, db } from "../services/firebase";
// Types
import { Inventory } from "../types/inventory";
// Utils
import { formatDateInput } from "../utils/formatDate";

export function useInventory() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [user] = useAuthState(auth);

  const [newInventory, setNewInventory] = useState({
    id: Date.now(),
    name: "",
    type: "",
    amount: 0,
    date: null,
  });

  const handleInputChange = (e: {
    target: { name: string; value: string; type: string };
  }) => {
    const { name, value, type } = e.target;
    let newValue: unknown = value;
    if (type === "date") {
      newValue = Timestamp.fromDate(new Date(value));
    } else if (name === "amount") {
      newValue = Number(value);
    }
    setNewInventory((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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
              inventory: [newInventory],
            };
            usersArray = [...usersArray, newUser];
          } else {
            const updatedInventory = Array.isArray(
              usersArray[userIndex].inventory
            )
              ? [...usersArray[userIndex].inventory, newInventory]
              : [newInventory];
            usersArray[userIndex] = {
              ...usersArray[userIndex],
              inventory: updatedInventory,
            };
          }

          transaction.update(documentRef, { users: usersArray });
          setInventory(
            usersArray[userIndex]
              ? usersArray[userIndex].inventory
              : [newInventory]
          );
        }
      });

      setNewInventory({
        id: Date.now(),
        name: "",
        amount: 0,
        type: "",
        date: null,
      });
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  const handleDelete = async (inventoryId: number) => {
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
            const updatedInventory = usersArray[userIndex].inventory.filter(
              (inventory: { id: number }) => inventory.id !== inventoryId
            );

            const updatedUsers = [...usersArray];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              inventory: updatedInventory,
            };

            transaction.update(documentRef, { users: updatedUsers });

            setInventory(updatedInventory);
          }
        }
      });
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  useEffect(() => {
    const documentRef = doc(db, "collection", "document");
    const unsubscribe = onSnapshot(documentRef, (document) => {
      if (document.exists()) {
        const usersArray = document.data().users;
        const loggedInUser = usersArray.find(
          (u: { id: string }) => u.id === (user?.uid ?? "")
        );
        if (loggedInUser && loggedInUser.inventory) {
          setInventory(loggedInUser.inventory);
        }
      }
    });
    return unsubscribe;
  }, [user]);

  const calculateRemainingDays = (date: Timestamp) => {
    const currentDate = new Date();
    const dateExpiryObj = new Date(date.seconds * 1000);
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
      return "today";
    }
  };

  return {
    inventory,
    newInventory,
    setNewInventory,
    handleInputChange,
    handleDelete,
    handleSubmit,
    formatDateInput,
    calculateRemainingDays,
  };
}

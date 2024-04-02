import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, Timestamp, onSnapshot, runTransaction } from "firebase/firestore";
// Services
import { db, auth } from "../services/firebase";
// Types
import { Visitor } from "../types/visitors";
// Utils
import { sanitize } from "../utils/sanitize";

export const useVisitor = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const [showAlert, setShowAlert] = useState(false);

  const [newVisitor, setNewVisitor] = useState({
    id: Date.now(),
    name: "",
    occasion: "",
    date: null,
    time: "",
  });

  const handleInputChange = (e: {
    target: { name: string; value: string; type: string };
  }) => {
    const { name, value, type } = e.target;
    let newValue: unknown = value;

    if (type === "text") {
      const sanitizeValue = sanitize(value);
      if (sanitizeValue !== null) {
        newValue = sanitizeValue;
      } else {
        console.error("Invalid input detected for ", name);
        return;
      }
    } else if (type === "date") {
      newValue = Timestamp.fromDate(new Date(value));
    } else if (type === "number" || name === "amount") {
      newValue = Number(value);
    }
    setNewVisitor((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          if (userIndex === -1) {
            usersArray.push({ id: user.uid, visitors: [newVisitor] });
          } else {
            usersArray[userIndex].visitors.push(newVisitor);
          }
          transaction.update(documentRef, { users: usersArray });
          setNewVisitor({
            id: Date.now(),
            name: "",
            occasion: "",
            date: null,
            time: "",
          });
        }
      });
    } catch (error) {
      console.error("Error adding visitor: ", error);
    }
  };

  const handleDelete = async (visitorId: number) => {
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
            const updatedVisitors = usersArray[userIndex].visitors.filter(
              (visitor: { id: number }) => visitor.id !== visitorId
            );
            usersArray[userIndex].visitors = updatedVisitors;
            transaction.update(documentRef, { users: usersArray });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting visitor: ", error);
    }
  };

  const handleDeleteWithAlert = (visitorId: number) => {
    handleDelete(visitorId);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchVisitors = async () => {
      if (!user) return;
      const documentRef = doc(db, "collection", "document");
      const unsub = onSnapshot(documentRef, (document) => {
        if (document.exists()) {
          const usersArray = document.data().users;
          const loggedInUser = usersArray.find(
            (u: { id: string }) => u.id === user.uid
          );
          if (loggedInUser && loggedInUser.visitors) {
            setVisitors(loggedInUser.visitors);
          }
        }
      });
      return unsub;
    };
    fetchVisitors();
  }, [user]);

  const formatDateForInput = (date: Timestamp | null) => {
    if (!date) return "";
    const jsDate = new Date(date.seconds * 1000);
    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const day = jsDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (time: Timestamp | null) => {
    if (!time) return "";
    const jsTime = new Date(time.seconds * 1000);
    const hours = jsTime.getHours().toString().padStart(2, "0");
    const minutes = jsTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const calculateRemainingDays = (date: Timestamp) => {
    const currentDate = new Date();
    const dateExpiryObj = new Date(date.seconds * 1000);
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

  return {
    visitors,
    newVisitor,
    setNewVisitor,
    handleInputChange,
    handleSubmit,
    formatDateForInput,
    loading,
    error,
    handleDeleteWithAlert,
    showAlert,
    calculateRemainingDays,
    formatTimeForInput,
  };
};

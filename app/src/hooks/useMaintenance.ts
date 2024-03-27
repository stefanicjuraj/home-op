import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
// Services
import { auth, db } from "../services/firebase";
// Types
import { Maintenance } from "../types/maintenance";

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [user] = useAuthState(auth);

  const [newMaintenanceTask, setNewMaintenanceTask] = useState({
    id: Date.now(),
    description: "",
    assignedTo: "",
    dueDate: null,
    isCompleted: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "isCompleted") {
      setNewMaintenanceTask((prevState) => ({
        ...prevState,
        [name]: value === "true",
      }));
    } else {
      setNewMaintenanceTask((prevState) => ({
        ...prevState,
        [name]: value,
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
              maintenanceTasks: [newMaintenanceTask],
            };
            usersArray = [...usersArray, newUser];
          } else {
            const updatedTasks = Array.isArray(
              usersArray[userIndex].maintenanceTasks
            )
              ? [...usersArray[userIndex].maintenanceTasks, newMaintenanceTask]
              : [newMaintenanceTask];
            usersArray[userIndex] = {
              ...usersArray[userIndex],
              maintenanceTasks: updatedTasks,
            };
          }

          transaction.update(documentRef, { users: usersArray });
        }
      });

      setNewMaintenanceTask({
        id: Date.now(),
        description: "",
        assignedTo: "",
        dueDate: null,
        isCompleted: false,
      });
    } catch (error) {
      console.error("Error adding maintenance task:", error);
    }
  };

  const handleDelete = async (id: number) => {
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
            const userMaintenance = usersArray[userIndex].maintenanceTasks;
            if (userMaintenance) {
              const updatedTasks = userMaintenance.filter(
                (task: { id: number }) => task.id !== id
              );
              usersArray[userIndex] = {
                ...usersArray[userIndex],
                maintenanceTasks: updatedTasks,
              };
              transaction.update(documentRef, { users: usersArray });
              setMaintenance(updatedTasks);
            }
          }
        }
      });
    } catch (error) {
      console.error("Error deleting maintenance task:", error);
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
            if (loggedInUser && loggedInUser.maintenanceTasks) {
              setMaintenance(loggedInUser.maintenanceTasks);
            }
          }
        })
      : () => {};

    return () => unsubscribe();
  }, [user]);

  const formatDateForInput = (date: Date | null | undefined) => {
    if (!date) return "";

    if (typeof date === "string") {
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  };

  return {
    newMaintenanceTask,
    setNewMaintenanceTask,
    maintenance,
    handleInputChange,
    handleSubmit,
    handleDelete,
    formatDateForInput,
  };
}

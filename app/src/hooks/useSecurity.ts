import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
// Services
import { db, auth } from "../services/firebase";
// Types
import { Security } from "../types/security";

export const useSecurity = () => {
  const [security, setSecurity] = useState<Security[]>([]);
  const [user, loading, error] = useAuthState(auth);

  const [newSecurityProtocol, setNewSecurityProtocol] = useState<Security>({
    id: Date.now(),
    name: "",
    description: "",
    isEnabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewSecurityProtocol((prevState) => ({
      ...prevState,
      [name]: value,
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
          const usersArray = document.data().users || [];
          const userIndex = usersArray.findIndex(
            (u: { id: string }) => u.id === user.uid
          );
          if (userIndex === -1) {
            usersArray.push({ id: user.uid, security: [newSecurityProtocol] });
          } else {
            const existingSecurity = usersArray[userIndex].security || [];
            usersArray[userIndex].security = [
              ...existingSecurity,
              newSecurityProtocol,
            ];
          }
          transaction.update(documentRef, { users: usersArray });
        } else {
          transaction.set(documentRef, {
            users: [{ id: user.uid, security: [newSecurityProtocol] }],
          });
        }
        setNewSecurityProtocol({
          id: Date.now(),
          name: "",
          description: "",
          isEnabled: false,
        });
      });
    } catch (error) {
      console.error("Error adding security protocol:", error);
    }
  };

  const handleDelete = async (protocolId: number) => {
    if (!user) return;

    const documentRef = doc(db, "collection", "document");
    try {
      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(documentRef);
        if (document.exists()) {
          const usersArray = document.data().users || [];
          const userIndex = usersArray.findIndex(
            (u: { id: string }) => u.id === user.uid
          );
          if (userIndex !== -1) {
            const updatedSecurity = usersArray[userIndex].security.filter(
              (protocol: { id: number }) => protocol.id !== protocolId
            );
            usersArray[userIndex].security = updatedSecurity;
            transaction.update(documentRef, { users: usersArray });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting security protocol:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = user
      ? onSnapshot(doc(db, "collection", "document"), (document) => {
          if (document.exists()) {
            const usersArray = document.data().users || [];
            const loggedInUser = usersArray.find(
              (u: { id: string }) => u.id === user.uid
            );
            if (loggedInUser && loggedInUser.security) {
              setSecurity(loggedInUser.security);
            }
          }
        })
      : () => {};

    return () => unsubscribe();
  }, [user]);

  return {
    security,
    newSecurityProtocol,
    setNewSecurityProtocol,
    handleInputChange,
    handleSubmit,
    handleDelete,
    loading,
    error,
  };
};

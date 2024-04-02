import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
// Services
import { db, auth } from "../services/firebase";
// Types
import { Contact } from "../types/contact";
// Utils
import { sanitize } from "../utils/sanitize";

export const useContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [newContacts, setNewContacts] = useState<Contact>({
    id: Date.now(),
    name: "",
    phoneNumber: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const sanitizeValue = sanitize(value);
    if (sanitizeValue !== null) {
      setNewContacts((prevState: Contact) => ({
        ...prevState,
        [name]: sanitizeValue,
      }));
    } else {
      console.error("Invalid input.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const documentRef = doc(db, "collection", "document");
    try {
      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(documentRef);
        if (document.exists()) {
          const contactsArray = document.data().contacts || [];
          contactsArray.push(newContacts);
          transaction.update(documentRef, { contacts: contactsArray });
        } else {
          transaction.set(documentRef, {
            contacts: [newContacts],
          });
        }
        setNewContacts({
          id: Date.now(),
          name: "",
          phoneNumber: "",
          address: "",
        });
      });
    } catch (error) {
      console.error("Error adding emergency contact:", error);
    }
  };

  const handleDelete = async (contactId: number) => {
    if (!user) return;

    const documentRef = doc(db, "collection", "document");
    try {
      await runTransaction(db, async (transaction) => {
        const document = await transaction.get(documentRef);
        if (document.exists()) {
          const contactsArray = document.data().contacts || [];
          const updatedContacts = contactsArray.filter(
            (contact: { id: number }) => contact.id !== contactId
          );
          transaction.update(documentRef, { contacts: updatedContacts });
        }
      });
    } catch (error) {
      console.error("Error deleting emergency contact.");
    }

    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 1000);
  };

  useEffect(() => {
    const unsubscribe = user
      ? onSnapshot(doc(db, "collection", "document"), (document) => {
          if (document.exists()) {
            const contactsArray = document.data().contacts || [];
            setContacts(contactsArray);
          }
        })
      : () => {};

    return () => unsubscribe();
  }, [user]);

  return {
    contacts,
    newContacts,
    setNewContacts,
    handleInputChange,
    handleSubmit,
    handleDelete,
    loading,
    error,
    showDeleteAlert,
  };
};

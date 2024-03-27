import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, Timestamp, runTransaction } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { Wishlist } from "../types/wishlist";
import { formatDateInput } from "../utils/formatDate";

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);
  const [user] = useAuthState(auth);

  const [newWishlistItem, setNewWishlistItem] = useState({
    id: Date.now(),
    item: "",
    amount: 0,
    cost: 0,
    date: null,
    type: "",
  });

  const handleInputChange = (e: {
    target: { name: string; value: string; type: string };
  }) => {
    const { name, value, type } = e.target;
    let newValue: unknown = value;

    if (type === "date" || type === "time") {
      newValue = type === "date" ? Timestamp.fromDate(new Date(value)) : value;
    } else if (name === "amount") {
      newValue = Number(value);
    }

    setNewWishlistItem((prevState) => ({
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
              wishlistItems: [newWishlistItem],
            };
            usersArray = [...usersArray, newUser];
          } else {
            const updatedItems = Array.isArray(
              usersArray[userIndex].wishlistItems
            )
              ? [...usersArray[userIndex].wishlistItems, newWishlistItem]
              : [newWishlistItem];
            usersArray[userIndex] = {
              ...usersArray[userIndex],
              wishlistItems: updatedItems,
            };
          }

          transaction.update(documentRef, { users: usersArray });
        }
      });

      setNewWishlistItem({
        id: Date.now(),
        item: "",
        amount: 0,
        cost: 0,
        date: null,
        type: "",
      });
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  const handleDelete = async (itemId: number) => {
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
            const updatedItems = usersArray[userIndex].wishlistItems.filter(
              (item: { id: number }) => item.id !== itemId
            );

            const updatedUsers = [...usersArray];
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              wishlistItems: updatedItems,
            };

            transaction.update(documentRef, { users: updatedUsers });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
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
            if (loggedInUser && loggedInUser.wishlistItems) {
              setWishlistItems(loggedInUser.wishlistItems);
            }
          }
        })
      : () => {};

    return () => unsubscribe();
  }, [user]);

  return {
    newWishlistItem,
    setNewWishlistItem,
    wishlistItems,
    handleInputChange,
    formatDateInput,
    handleSubmit,
    handleDelete,
  };
}

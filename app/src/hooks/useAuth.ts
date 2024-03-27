import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addUserToFirestore(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error in user creation.");
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addUserToFirestore(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error in user login: ");
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error in user logout: ");
    throw error;
  }
};

export const addUserToFirestore = async (firebaseUser: User) => {
  const userToAdd = {
    id: firebaseUser.uid,
    user: firebaseUser.displayName || firebaseUser.email,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };

  if (userToAdd.email === null) {
    throw new Error("User email is null");
  }

  try {
    const documentRef = doc(db, "collection", "document");
    const document = await getDoc(documentRef);

    if (document.exists()) {
      await updateDoc(documentRef, {
        users: arrayUnion(userToAdd),
      });
    } else {
      await setDoc(documentRef, { users: [userToAdd] });
    }
  } catch (error) {
    console.error("Error adding/updating user in Firestore.");
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await addUserToFirestore(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error in user login with Google.");
    throw error;
  }
};

export { auth };

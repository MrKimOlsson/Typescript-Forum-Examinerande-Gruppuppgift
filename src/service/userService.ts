import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../types";

const db = getFirestore();

// hämtar en användare baserat på ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    return null;
  }
}


export async function addUser(user: User): Promise<void> {
  try {
    const usersRef = doc(db, "users", user.id.toString());
    await setDoc(usersRef, user);
    console.log("Ny tråd skapad med ID:", user.id);
  } catch (error) {
    console.error("Fel vid tillägg av tråd:", error);
  }
}

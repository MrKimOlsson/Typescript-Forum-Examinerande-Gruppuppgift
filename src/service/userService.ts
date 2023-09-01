import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export interface User {
  id:       string;
  name:     string;
  userName: string;
}

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
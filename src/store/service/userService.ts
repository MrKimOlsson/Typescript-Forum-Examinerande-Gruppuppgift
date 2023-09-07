import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { User } from "../../types/types";

const db = getFirestore();

// hämtar en användare baserat på ID
export async function getUserById(userId: number): Promise<User | null> {
  try {
    const userRef = doc(db, "users", userId.toString());
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

export async function getUserByName(name: string): Promise<User | null> {
  try {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('name', '==', name));
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      return userData as User;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
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

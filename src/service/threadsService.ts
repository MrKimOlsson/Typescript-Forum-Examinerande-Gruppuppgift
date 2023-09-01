import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

export interface Thread {
  category:     string;
  creationDate: Date;
  creator:      User;
  description:  string;
  id:           string;
  title:        string;
}

export interface User {
  id:       string;
  name:     string;
  userName: string;
}

// lägger till en ny tråd
export async function addThread(thread: Thread): Promise<void> {
  try {
    const threadRef = doc(db, "threads", thread.id);
    await setDoc(threadRef, thread);
    console.log("Ny tråd skapad med ID:", thread.id);
  } catch (error) {
    console.error("Fel vid tillägg av tråd:", error);
  }
}

// hämtar en tråd baserat på ID
export async function getThreadById(threadId: string): Promise<Thread | null> {
  try {
    const threadRef = doc(db, "threads", threadId);
    const threadDoc = await getDoc(threadRef);

    if (threadDoc.exists()) {
      const threadData = threadDoc.data();
      return threadData as Thread;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fel vid hämtning av tråd:", error);
    return null;
  }
}

// hämtar alla trådar baserar på category
export async function getThreadsByCategory(category: string): Promise<Thread[]> {
  try {
    const threadsQuery = query(
      collection(db, "threads"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(threadsQuery);
    const threads: Thread[] = [];

    querySnapshot.forEach((doc) => {
      const threadData = doc.data();
      threads.push(threadData as Thread);
    });

    return threads;
  } catch (error) {
    console.error("Fel vid hämtning av trådar inom kategorin:", error);
    return [];
  }
}

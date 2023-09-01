import { db } from "../firebase/config"
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import { Thread } from "../types";

// const db = getFirestore();

// interface Thread {
// id: string;
// title: string;
// category: ThreadCategory;
// creationDate: string;
// description: string;
// creator: object;
// }

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

async function fetchGeneralThreads(): Promise<Thread[]> {
  try {
    const GeneralThreadsCollectionRef = collection(db, 'threads');
    const generalThreadsSnapshot = await getDocs(GeneralThreadsCollectionRef);
    const generalThreads: Thread[] = [];
    generalThreadsSnapshot.forEach((doc) => {
      generalThreads.push(doc.data() as Thread);
    });

    return generalThreads;
  } catch (error) {
    console.error('Error fetching general threads:', error);
    return [];
  }
}

async function fetchQnaThreads(): Promise<Thread[]> {
  try {
    const GeneralThreadsCollectionRef = collection(db, 'qnathreads');
    const generalThreadsSnapshot = await getDocs(GeneralThreadsCollectionRef);
    const generalThreads: Thread[] = [];
    generalThreadsSnapshot.forEach((doc) => {
      generalThreads.push(doc.data() as Thread);
    });

    return generalThreads;
  } catch (error) {
    console.error('Error fetching general threads:', error);
    return [];
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

const threadsSevice = {
  fetchGeneralThreads,
  fetchQnaThreads
}

export default threadsSevice

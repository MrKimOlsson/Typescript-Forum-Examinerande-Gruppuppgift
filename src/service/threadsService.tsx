import { db } from "../firebase/config"
import { getFirestore, collection, deleteDoc, addDoc, doc, setDoc, getDoc, query, where, getDocs, DocumentSnapshot, updateDoc } from "firebase/firestore";
import { Thread } from "../types";

export async function addThread(thread: Thread): Promise<void> {
  try {

    const threadRef = doc(db, thread.category+"threads", thread.id.toString());
    await setDoc(threadRef, thread);
    console.log("Ny tråd skapad med ID:", thread.id);
  } catch (error) {
    console.error("Fel vid tillägg av tråd:", error);
  }
}

async function fetchGeneralThreads(): Promise<Thread[]> {
  try {
    const GeneralThreadsCollectionRef = collection(db, 'generalthreads');
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
    const QnaThreadsCollectionRef = collection(db, 'qnathreads');
    const qnaThreadsSnapshot = await getDocs(QnaThreadsCollectionRef);
    const qnaThreads: Thread[] = [];
    qnaThreadsSnapshot.forEach((doc) => {
      qnaThreads.push(doc.data() as Thread);
    });

    return qnaThreads;
  } catch (error) {
    console.error('Error fetching qna threads:', error);
    return [];
  }
}

async function deleteThread(threadId: string): Promise<void> {
  try {
    const threadRef = doc(db, 'generalthreads', threadId);
    await deleteDoc(threadRef);
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
}

export async function updateThread(threadId: string, updatedThread: Partial<Thread>): Promise<void> {
  try {
    const threadRef = doc(db, 'threads', threadId);
    await updateDoc(threadRef, updatedThread);
    console.log('Tråden har uppdaterats:', threadId);
  } catch (error) {
    console.error('Fel vid uppdatering av tråd:', error);
    throw error;
  }
}

export async function getThreadById(threadId: string): Promise<any | null> {
  try {
    const threadRef = doc(db, 'threads', threadId);
    const threadDoc = await getDoc(threadRef);

    if (threadDoc.exists()) {
      const threadData = threadDoc.data();
      return threadData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Fel vid hämtning av tråd:', error);
    return null;
  }
}


// export async function getThreadsByCategory(category: string): Promise<Thread[]> {
//   try {
//     const threadsQuery = query(
//       collection(db, "threads"),
//       where("category", "==", category)
//     );

//     const querySnapshot = await getDocs(threadsQuery);
//     const threads: Thread[] = [];

//     querySnapshot.forEach((doc) => {
//       const threadData = doc.data();
//       threads.push(threadData as Thread);
//     });

//     return threads;
//   } catch (error) {
//     console.error("Fel vid hämtning av trådar inom kategorin:", error);
//     return [];
//   }
// }

const threadsSevice = {
  fetchGeneralThreads,
  fetchQnaThreads,
  deleteThread,
  updateThread,
  getThreadById
}

export default threadsSevice

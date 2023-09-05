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

// Experimental dynamic fetch
async function fetchThreads(category: string): Promise<Thread[]> {
  try {
    const ThreadsCollectionRef = collection(db, category+'threads');
    const threadsSnapshot = await getDocs(ThreadsCollectionRef);
    const threads: Thread[] = [];
    threadsSnapshot.forEach((doc) => {
      threads.push(doc.data() as Thread);
    });

    return threads;
  } catch (error) {
    console.error('Error fetching qna threads:', error);
    return [];
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

export async function updateThread(threadId: string, thread: Thread, updatedThread: Partial<Thread>): Promise<void> {
  try {
    const threadRef = doc(db, thread.category+"threads", threadId); // Ändra till 'generalthreads'
    console.log(thread.category)
    console.log(threadId)
    console.log(thread)
    await updateDoc(threadRef, updatedThread);
    console.log('Tråden har uppdaterats:', threadId);
  } catch (error) {
    console.error('Fel vid uppdatering av tråd:', error);
    throw error;
  }
}

export async function getThreadById(threadId: string, category?: string): Promise<any | null> {
  try {
    const threadRef = doc(db, category+"threads", threadId); // Ändra till 'generalthreads'
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


const threadsSevice = {
  fetchGeneralThreads,
  fetchQnaThreads,
  deleteThread,
  updateThread,
  getThreadById,
  fetchThreads
}

export default threadsSevice
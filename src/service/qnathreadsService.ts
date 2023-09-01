import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { QNAThread } from "../types";

const db = getFirestore();

// lägger till en ny tråd
export async function addQnaThread(qnaThread: QNAThread): Promise<void> {
  try {
    const qnaThreadRef = doc(db, "qnaThreads", qnaThread.id);
    await setDoc(qnaThreadRef, qnaThread);
    console.log("Ny QnA-tråd skapad med ID:", qnaThread.id);
  } catch (error) {
    console.error("Fel vid tillägg av QnA-tråd:", error);
  }
}

// hämtar en QnA-tråd baserat på ID
export async function getQnaThreadById(qnaThreadId: string): Promise<QNAThread | null> {
  try {
    const qnaThreadRef = doc(db, "qnaThreads", qnaThreadId);
    const qnaThreadDoc = await getDoc(qnaThreadRef);

    if (qnaThreadDoc.exists()) {
      const qnaThreadData = qnaThreadDoc.data();
      return qnaThreadData as QNAThread;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fel vid hämtning av QnA-tråd:", error);
    return null;
  }
}

// hämtar alla QnA-trådar baserat på category
export async function getQnaThreadsByCategory(category: string): Promise<QNAThread[]> {
  try {
    const qnaThreadsQuery = query(
      collection(db, "qnaThreads"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(qnaThreadsQuery);
    const qnaThreads: QNAThread[] = [];

    querySnapshot.forEach((doc) => {
      const qnaThreadData = doc.data();
      qnaThreads.push(qnaThreadData as QNAThread);
    });

    return qnaThreads;
  } catch (error) {
    console.error("Fel vid hämtning av QnA-trådar inom kategorin:", error);
    return [];
  }
}

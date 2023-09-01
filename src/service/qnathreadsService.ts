import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

export interface QnaThread {
  category:         string;
  commentAnswerId:  string;
  creationDate:     Date;
  creator:          User;
  description:      string;
  id:               string;
  isAnswered:       boolean;
  title:            string;
}

export interface User {
  id:       string;
  name:     string;
  userName: string;
}

// lägger till en ny tråd
export async function addQnaThread(qnaThread: QnaThread): Promise<void> {
  try {
    const qnaThreadRef = doc(db, "qnaThreads", qnaThread.id);
    await setDoc(qnaThreadRef, qnaThread);
    console.log("Ny QnA-tråd skapad med ID:", qnaThread.id);
  } catch (error) {
    console.error("Fel vid tillägg av QnA-tråd:", error);
  }
}

// hämtar en QnA-tråd baserat på ID
export async function getQnaThreadById(qnaThreadId: string): Promise<QnaThread | null> {
  try {
    const qnaThreadRef = doc(db, "qnaThreads", qnaThreadId);
    const qnaThreadDoc = await getDoc(qnaThreadRef);

    if (qnaThreadDoc.exists()) {
      const qnaThreadData = qnaThreadDoc.data();
      return qnaThreadData as QnaThread;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fel vid hämtning av QnA-tråd:", error);
    return null;
  }
}

// hämtar alla QnA-trådar baserat på category
export async function getQnaThreadsByCategory(category: string): Promise<QnaThread[]> {
  try {
    const qnaThreadsQuery = query(
      collection(db, "qnaThreads"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(qnaThreadsQuery);
    const qnaThreads: QnaThread[] = [];

    querySnapshot.forEach((doc) => {
      const qnaThreadData = doc.data();
      qnaThreads.push(qnaThreadData as QnaThread);
    });

    return qnaThreads;
  } catch (error) {
    console.error("Fel vid hämtning av QnA-trådar inom kategorin:", error);
    return [];
  }
}

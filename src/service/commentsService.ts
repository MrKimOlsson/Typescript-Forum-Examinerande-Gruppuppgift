import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Comment } from "../types";
const db = getFirestore();

// lägger till ny kommentar
async function addComment(threadId: string, comment: Omit<Comment, 'id'>): Promise<Comment> {
  try {
    const numericId = Date.now();
    const newComment = {
      ...comment,
      id: numericId,
      threadId: threadId 
    };
    const docRef = await addDoc(collection(db, "comments"), newComment);
    console.log("New comment added with Firestore ID:", docRef.id, " and Numeric ID:", numericId);

    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}







// hämtar alla kommentarer
async function getAllComments(): Promise<Comment[]> {
  try {
    const commentQuery = collection(db, "comments");
    const querySnapshot = await getDocs(commentQuery);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      comments.push(commentData as Comment);
    });

    return comments;
  } catch (error) {
    console.error("Fel vid hämtning av kommentarer:", error);
    return [];
  }
}

async function getCommentsByThreadId(threadId: number): Promise<Comment[]> {
  try {
    const commentQuery = query(
      collection(db, "comments"),
      where("thread", "==", threadId)  // <-- This will filter comments by thread ID
    );

    const querySnapshot = await getDocs(commentQuery);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const commentDataID = doc.data();
      comments.push({ id: parseInt(doc.id), ...commentDataID } as Comment); // cast doc.id to a number
    });


    return comments;
  } catch (error) {
    console.error("Fel vid hämtning av kommentarer:", error);
    return [];
  }
}

export { addComment, getAllComments, getCommentsByThreadId };
import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { Comment } from "../../types";

const db = getFirestore();

async function addComment(threadId: string, comment: Omit<Comment, 'id'>): Promise<Comment> {
  try {
    const newComment = {
      ...comment,
      thread: parseInt(threadId, 10),
      id: Date.now()  
    };
    await addDoc(collection(db, "comments"), newComment);
    console.log("New comment added with Numeric ID:", newComment.id);
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

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
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function getCommentsByThreadId(threadId: string): Promise<Comment[]> {
  try {
    const commentQuery = query(
      collection(db, "comments"),
      where("thread", "==", parseInt(threadId, 10))
    );

    const querySnapshot = await getDocs(commentQuery);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const commentData = doc.data() as Comment;
      comments.push(commentData);
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments by thread ID:", error);
    return [];
  }
}

async function deleteComment(id: number): Promise<void> {
  try {
    const commentQuery = query(
      collection(db, "comments"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(commentQuery);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "comments", docId));
      console.log(`Comment with ID ${id} has been deleted.`);
    } else {
      console.error(`No comment found with ID ${id}.`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export { addComment, getAllComments, getCommentsByThreadId, deleteComment };

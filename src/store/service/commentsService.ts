import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { Comment } from "../../types";

const db = getFirestore();

async function addComment(category: string | undefined, threadId: string, comment: Omit<Comment, 'id'>): Promise<Comment> {
  try {
    const newComment = {
      ...comment,
      thread: parseInt(threadId, 10),
      id: Date.now()  
    };
    // check if thread is a q&a 
    const threadDoc = doc(db, category+'threads', threadId)
    const threadSnapshot = await getDoc(threadDoc);

    if (threadSnapshot.exists()) {
      const threadData = threadSnapshot.data();
      let commentAnswerId = threadData.commentAnswerId || 0;

      // Check if commentAnswerId should be changed
      commentAnswerId += 1
      
      const updatedThread = {
        ...threadData,
        isAnswered: true,
        commentAnswerId: commentAnswerId,
        answerId: newComment.id 
      };
      await updateDoc(threadDoc, updatedThread);
      await addDoc(collection(db, "comments"), newComment);
    }
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
      const threadId = querySnapshot.docs[0].data().thread;

      const allCommentsQuery = query(
        collection(db, "comments"),
        where("thread", "==", threadId)
      );
      const allCommentsSnapshot = await getDocs(allCommentsQuery);

      if (allCommentsSnapshot.size === 1) {
        const threadDoc = doc(db, "qnathreads", threadId.toString());
        const threadSnapshot = await getDoc(threadDoc);

        if (threadSnapshot.exists()) {
          const threadData = threadSnapshot.data();

          const updatedThread = {
            ...threadData,
            isAnswered: false,
          };
          await updateDoc(threadDoc, updatedThread);
        }
      }

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

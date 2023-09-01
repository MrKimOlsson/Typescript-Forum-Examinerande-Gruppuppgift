import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

interface Comment {
  content:  string;
  creator:  User;
  id:       string;
}

interface User {
  id:       string;
  name:     string;
  userName: string;
}

// lägger till ny kommentar
async function addComment(comment: Comment): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, "comments"), comment);
      console.log("Ny kommentar skapad med ID:", docRef.id);
    } catch (error) {
      console.error("Fel vid tillägg av kommentar:", error);
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
  
  export {addComment, getAllComments };
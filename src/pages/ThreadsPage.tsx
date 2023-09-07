import { useDispatch, useSelector } from 'react-redux';
import useDoc from '../hooks/useDoc';
import Loader from '../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/forms/AddCommentForm/CommentForm';
import { addComment } from '../store/service/commentsService';
import { fetchCommentsByThreadId, addComment as addCommentToSlice } from '../store/slices/commentsSlice';
import { useEffect } from 'react';
import { ThreadCategory } from '../types'
import { Comment } from '../types';
import { AppDispatch } from '../store';
import CommentsComponent from '../components/comments/CommentsComponent';


type ThreadProps = {
  id: string
  category: ThreadCategory
}

type CommentsState = {
  comments: Comment[],
  loading: boolean,
}

type RootStateProps = {
  comments: CommentsState;
};
// type ErrorProps = {
//   message: string
// }


// TYPE GUARDS ----------
// in ThreadsPage component, type guards are used at isValidComment.
// "isValidComment"  validates individuel comments and checks that a comment has valid content and creator name properties, and a numeric ID before it is displayed on the frontend. This helps in avoiding possible errors that might wanna try to pass through.
// with a type guard  we are making sure that only valid comments thats following Comment type to make it through to the sortedComments array which is later used to map and render the comment components.
// this helps it be crash safe and keeps data clean.


// TYPESAFE ----------
// ThreadsPage is type safe because:
// we are using types and interfaces that defines the structure on object variables which helps us follow their structure and format.
// handleCommitSubmit expects a string parameter and returns none
// typescripts omit when creating commentobject gives exakt controll över the types.



function isValidComment(comment: Comment): comment is Comment {
  return typeof comment.content === 'string' && typeof comment.creator.name === 'string' && typeof comment.id === 'number';
}

const ThreadsPage = () => {
  const { id, category } = useParams<ThreadProps>();
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector((state: RootStateProps) => state.comments.comments);
  const commentsLoading = useSelector((state: RootStateProps) => state.comments.loading);

  const { data: thread, error, loading } = useDoc(category + 'threads', id || '');

  const sortedComments = comments
    .filter(isValidComment)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .reverse()

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByThreadId(parseInt(id, 10)));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (id === undefined) {
    console.error('Failed to get the thread');
    return <p>Thread ID is missing</p>;
  }

  if (!thread) {
    return (
      <div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    );
  }


  const handleCommentSubmit = async (commentText: string) => {
    try {
      const currentDate = new Date();
      const timeZone = 'Europe/Stockholm';
      const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })

      const formattedDate = dateFormatter.format(currentDate)
      const comment: Omit<Comment, 'id'> = {
        thread: Number(thread.id),
        creator: {
          id: 1,
          name: "Anonymous",
          userName: "AnonymousUser"
        },
        content: commentText,
        createdAt: formattedDate,
      };

      const newComment = await addComment(category, id, comment);
      dispatch(addCommentToSlice({ ...newComment }));
      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  

  return (
    <div className='wrapper'>
      <div className='thread'>
        <div className='content'>
          <div className='row'>
            <p>Category: {thread.category}</p>
            <p>Creation date: {thread.creationDate}</p>
          </div>
          <h4 className='threadTitle'>{thread.title}</h4>
          <p className='threadDescription'>{thread.description}</p>
          <p className='threadCreator'>Author: {thread.creator.userName}</p>
          <br />
        </div>
      </div>

      <div className='titleWrapper'>
        <h4>Comments:</h4>
      </div>
      <div className='thread'>
        {commentsLoading && <Loader />}
        {sortedComments.length > 0 ? (
          sortedComments.map((comment: Comment, index: number) => (
            <CommentsComponent key={comment.id} comment={comment} index={index} />
          ))
        ) : (
          <h5 className='noCommentsText'>Be the first to comment!</h5>
        )}
      </div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>

  );
};

export default ThreadsPage;
import { useDispatch, useSelector } from 'react-redux';
import useDoc from '../hooks/useDoc';
import Loader from '../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/forms/AddCommentForm/CommentForm';
import { addComment } from '../store/service/commentsService';
import { fetchCommentsByThreadId, addComment as addCommentToSlice } from '../store/slices/commentsSlice';
import { useEffect } from 'react';
import { ThreadCategory } from '../types'
import { Comment, Thread as ThreadType } from '../types';
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


function isValidComment(comment: any): comment is Comment {
  return typeof comment.content === 'string' && typeof comment.creator.name === 'string' && typeof comment.id === 'number';
}

const ThreadsPage = () => {
  const { id, category } = useParams<ThreadProps>();
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector((state: RootStateProps) => state.comments.comments);
  const commentsLoading = useSelector((state: RootStateProps) => state.comments.loading);

  const { data: thread, error, loading } = useDoc(category + 'threads', id || '');

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByThreadId(parseInt(id, 10)));
    }
  }, [id, dispatch]);

  if(loading) {
    return <Loader />
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  if(thread) {
    const { title, description, creationDate, creator } = thread;
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
      const comment: Omit<Comment, 'id'> = {
        thread: Number(thread.id),
        creator: {
          id: 1,
          name: "Anonymous",
          userName: "AnonymousUser"
        },
        content: commentText
      };

      const newComment = await addComment(id, comment);
      dispatch(addCommentToSlice({ ...newComment }));
      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // const handleDeleteComment = async (commentId: number) => {
  //   try {
  //     await dispatch(deleteCommentAsync(commentId));
  //     console.log('Comment deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting comment:', error);
  //   }
  // };

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
          <p className='threadCreator'>Creator: {thread.creator.userName}</p>
          <br />
        </div>
      </div>

      <div className='titleWrapper'>
        <h4>Comments:</h4>
      </div>
      <div className='thread'>
        {commentsLoading && <Loader />}
        {comments.length > 0 ? (
          comments.filter(isValidComment).map((comment: Comment, index: number) => (
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
import { useDispatch, useSelector } from 'react-redux';
import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/AddCommentForm/CommentForm';
import { addComment } from '../../service/commentsService';
import { fetchCommentsByThreadId, addComment as addCommentToSlice, deleteCommentAsync } from '../../store/commentsSlice';
import { Comment, Thread as ThreadType } from '../../types';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store';
import CommentsComponent from '../../components/comments/CommentsComponent';

function isValidComment(comment: any): comment is Comment {
  return typeof comment.content === 'string' && typeof comment.creator.name === 'string' && typeof comment.id === 'number';
}

const Thread = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector((state: RootState) => state.comments.comments);
  const commentsLoading = useSelector((state: RootState) => state.comments.loading);

  const { data: thread, error, loading } = useDoc(category + 'threads', id || '');

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByThreadId(parseInt(id, 10)));
    }
  }, [id, dispatch]);

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

  const handleDeleteComment = async (commentId: number) => {
    try {
      await dispatch(deleteCommentAsync(commentId));
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
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
          comments.map((comment: Comment, index: number) => (
            <CommentsComponent key={comment.id} comment={comment} index={index} /> // Pass the 'index' prop
            ))
          ) : (
            <h2>No threads to show</h2>
          )}          
      </div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
   
  );
};

export default Thread;

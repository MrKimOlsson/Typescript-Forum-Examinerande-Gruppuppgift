import { useDispatch, useSelector } from 'react-redux';
import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/AddCommentForm/CommentForm';
import { addComment } from '../../service/commentsService';
import { fetchCommentsByThreadId, addComment as addCommentToSlice, deleteCommentAsync } from '../../store/commentsSlice';
import { Comment, Thread as ThreadType } from '../../types';
import { useEffect } from 'react';
import './Thread.css'
import { AppDispatch, RootState } from '../../store';

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
        <h4>Title: {thread.title}</h4>
        <p>Thread description: {thread.description}</p>
        <p>Category: {thread.category}</p>
        <p>Creation date: {thread.creationDate}</p>
        <p>Thread ID: {thread.id}</p>
        <br />
        <p><strong>Thread Creator</strong></p>
        <p>Name: {thread.creator.name}</p>
        <p>Username: {thread.creator.userName}</p>
        <p>ID: {thread.creator.id}</p>
      </div>

      <div className='thread'>
        <h4>Comments:</h4>
        {commentsLoading && <Loader />}
        {comments.map((comment) => (
          isValidComment(comment) ? (
            <div key={comment.id} className="comment-card">
              <p>User: {comment.creator.name}</p>
              <p>{comment.content}</p>
              <p>{comment.id}</p>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          ) : (
            <p>Invalid comment data</p>
          )
        ))}
      </div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default Thread;

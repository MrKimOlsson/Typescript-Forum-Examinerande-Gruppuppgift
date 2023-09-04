import { useDispatch, useSelector } from 'react-redux';
import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/AddCommentForm/CommentForm';
import { addComment, getCommentsByThreadId, deleteComment } from '../../service/commentsService';
import { fetchCommentsByThreadId, addComment as addCommentToSlice, deleteCommentAsync } from '../../store/commentsSlice';
import { Comment } from '../../types';
import { useState, useEffect } from 'react';
import { AppDispatch } from '../../store';
import CommentsComponent from '../../components/comments/CommentsComponent';




const Thread = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector((state: any) => state.comments.comments);
  const commentsLoading = useSelector((state: any) => state.comments.loading);

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
        thread: parseInt(id),
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

  // const handleDeleteComment = async (id: number) => {
  //   try {
  //     await dispatch(deleteCommentAsync(id));
  //     console.log('Comment deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting comment:', error);
  //   }
  // };
  
  return (
    <div className='wrapper'>
      <div className='thread'>
        <div className='content'>
          <h4>Title: {thread.title}</h4>
          <p>Thread description: {thread.description}</p>
          <p>Category{thread.category}</p>
          <p>Creation date{thread.creationDate}</p>
          <p>Thread ID: {thread.id}</p>
          <br />
          <p><strong>Thread Creator</strong></p>
          <p>Name: {thread.creator.name}</p>
          <p>Username: {thread.creator.userName}</p>
          <p>ID: {thread.creator.id}</p>
        </div>
      </div>

      <div className='titleWrapper'>
      <h4>Comments:</h4>
      </div>
      <div className='thread'>
        <div className='comment-card'>
          {commentsLoading && <Loader />}
          {comments.length > 0 ? (
          comments.map((comment: Comment, index: number) => (
            <CommentsComponent key={comment.id} comment={comment} index={index} /> // Pass the 'index' prop
            ))
          ) : (
            <h2>No threads to show</h2>
          )}          
          {/* <button onClick={() => handleDeleteComment(comment.id)}>Delete</button> */}
          <div className='content commentForm'>
            <CommentForm onCommentSubmit={handleCommentSubmit} />
          </div>
          </div>
        </div>
    </div>
   
  );
}

export default Thread
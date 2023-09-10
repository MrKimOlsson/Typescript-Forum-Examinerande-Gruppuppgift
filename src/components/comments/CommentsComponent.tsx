import React, { useEffect } from 'react'
import { Comment } from '../../types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCommentsByThreadId, deleteCommentAsync } from '../../store/slices/commentsSlice';
import useDoc from '../../hooks/useDoc';
import { AppDispatch } from '../../store';
import Loader from '../loader/Loader';

// Define the properties (props) that this component expects to receive
interface ThreadsProps {
    comment: Comment; // Comment data for this component
    index: number; // Add an index prop to determine even/odd
  }


const CommentsComponent: React.FC<ThreadsProps> = ({ comment, index }) => {

    // Get the thread ID and category from the URL parameters
    const { id, category } = useParams<{ id: string; category: string }>();

    // Initialize Redux dispatch for dispatching actions
    const dispatch = useDispatch<AppDispatch>();

    // Use a custom hook (useDoc) to fetch thread data based on category and ID
     const { data: thread, error, loading } = useDoc(category + 'threads', id || '');

    useEffect(() => {
        // Use an effect to fetch comments for the thread when the component mounts or the ID changes
        if (id) {
        dispatch(fetchCommentsByThreadId(parseInt(id, 10))); 
        }

    }, [id, dispatch]);

    // Handle scenarios when the thread ID is missing or not found
    if (id === undefined) {
        console.error('Failed to get the thread');
        return <p>Thread ID is missing</p>;
    }

    // Display a loader if the thread data is still loading
    if (!thread) {
        return (
        <div>
            {loading && <Loader />}
            {error && <p>{error}</p>}
        </div>
        );
    }

    // Define a card style based on the index to alternate background colors
    const cardStyle = {
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
    };

    // Handle the deletion of a comment
  const handleDeleteComment = async (id: number) => {
    try {
      await dispatch(deleteCommentAsync(id));
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };  

  // Render the comment card
  return (
    <>
    <div key={comment.id} className="comment-card" style={cardStyle}>
        <div className='content'>
           <div className='row'>
              {/* <p>Category: {thread.category}</p> */}
              {/* <p>Creation date: {createdAt}</p> */}
              <p className="commentCreator">{comment.createdAt}</p>
            </div>
            <p className='commentContent'>{comment.content}</p>
            <div className='row'>
            <p className="commentCreator">User: {comment.creator.name}</p>
            <button onClick={() => handleDeleteComment(comment.id)}className="btn">Delete</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default CommentsComponent
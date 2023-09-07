import React, { useEffect } from 'react'
import { Comment } from '../../types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCommentsByThreadId, deleteCommentAsync } from '../../store/slices/commentsSlice';
import useDoc from '../../hooks/useDoc';
import { AppDispatch } from '../../store';
import Loader from '../loader/Loader';

interface ThreadsProps {
    comment: Comment;
    index: number; // Add an index prop to determine even/odd
  }

const CommentsComponent: React.FC<ThreadsProps> = ({ comment, index }) => {

    const { id, category } = useParams<{ id: string; category: string }>();
    const dispatch = useDispatch<AppDispatch>();

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

    const cardStyle = {
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
    };

  const handleDeleteComment = async (id: number) => {
    try {
      await dispatch(deleteCommentAsync(id));
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // const handleDate = () => {

  //   let formattedDate = '';

  //   if(!comment.createdAt){
  //     formattedDate = 'No date found';
  //   } else {
  //     // Handle date:
  //   const timestamp = comment.createdAt;
  //   // Create a Date object from the timestamp
  //   const date = new Date(timestamp);

  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hour = String(date.getHours()).padStart(2, '0');
  //   const minute = String(date.getMinutes()).padStart(2, '0');

  //   // Create a formatted string with the extracted components
  //   formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
  //   return formattedDate
  //   }
    
  // }
  // handleDate()
  

  return (
    <>
    <div key={comment.id} className="comment-card" style={cardStyle}>
        <div className='content'>
           <div className='row'>
              {/* <p>Category: {thread.category}</p> */}
              {/* <p>Creation date: {createdAt}</p> */}
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
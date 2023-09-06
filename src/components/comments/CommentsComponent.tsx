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

    // const comments = useSelector((state: any) => state.comments.comments);
    //  const commentsLoading = useSelector((state: any) => state.comments.loading);

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

  return (
    <>
    <div key={comment.id} className="comment-card" style={cardStyle}>
        <div className='content'>
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
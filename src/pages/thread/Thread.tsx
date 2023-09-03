import React from 'react'
import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/AddCommentForm/CommentForm';
import { addComment, getCommentsByThreadId } from '../../service/commentsService';
import { Comment } from '../../types';
import { useState, useEffect } from 'react';
import './Thread.css'

const Thread = () => {

  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const { data: thread, error, loading } = useDoc('threads', id || '');

  useEffect(() => {
    const fetchComments = async () => {
      if (id) {
        const fetchedComments = await getCommentsByThreadId(parseInt(id));
        console.log("Fetched Comments:", fetchedComments);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [id]);


  if (id === undefined) {
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

      await addComment(id, comment);
      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }



  return (
    <div className='wrapper'>
      <div className='thread'>
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

      <div className='thread'>
        <h4>Comments:</h4>
        {comments.map(comment => (
          <div key={comment.id} className="comment-card">
            <p>User: {comment.creator.name}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>



      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}

export default Thread
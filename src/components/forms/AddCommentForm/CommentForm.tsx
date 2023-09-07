import React, { useState } from 'react';
import './CommentForm.css'
import { Comment } from '../../../types/types';

const CommentForm: React.FC<{ onCommentSubmit: (comment: string) => void }> = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (commentText.trim() !== '') {
      onCommentSubmit(commentText);
      setCommentText('');
    }
  }

  return (
    <form className="forum-form" onSubmit={handleSubmit}>
      <textarea
        className="forum-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button className="forum-button" type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;

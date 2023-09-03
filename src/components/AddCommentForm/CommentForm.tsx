import React, { useState } from 'react';





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
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;

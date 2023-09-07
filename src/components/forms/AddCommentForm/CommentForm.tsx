import React, { useState } from 'react';
import './CommentForm.css'

// TYPE SAFE ----------
// the CommentForm component is type-safe and some examples for it being it is:
// the parameter function "onCommentSubmit" accepts a string as an argument and returns void which is nothing and returns no value.
// the handling of the event in the "handleSubmit" method is locked to parameter 'e' of at React.FormEvent. this emake sure that only form events can be passed to the method, which make it type safe.
// the handleSubmit is locked to the "onSubmit" event. ff you were to try to call it with a string or an object, for instance handleSubmit("value") it will give a error. this stops incorrect calls and keeps it type safe.

// HOOK TYPING ----------
// The CommentForm component uses React hooks in a safe way and some ways are:
// that it uses the useState hook ofr the comment text starting with an empty string. this means we have a safe place to store and change the comment text without worrying about mixing it with other types of data.
// that the "handleSubmit" only allows proper form events to be handled, stopping any weird errors from happening when the form is submitted.




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

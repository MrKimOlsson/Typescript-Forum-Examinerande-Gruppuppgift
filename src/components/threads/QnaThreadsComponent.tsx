import React from 'react';
import { QNAThread } from '../../types';
import { Link } from 'react-router-dom';
import threadsService from '../../store/service/threadsService';
import { useDispatch } from 'react-redux';
import { removeThread } from '../../store/slices/threadsSlice';

interface ThreadsProps {
  thread: QNAThread;
  index: number; // Add an index prop to determine even/odd
}

const QnaThreadsComponent: React.FC<ThreadsProps> = ({ thread, index }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await threadsService.deleteThread(String(thread.id) , thread);
      // await threadsService.deleteThread(String(thread.id));
      console.log('Thread deleted successfully');
      dispatch(removeThread(String(thread.id)));
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  }

  const cardStyle = {
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
  };


  // No answer to the QNA thread
  let answerStyle = {
    color: 'firebrick',
  };
  let isAnswered = 'No answers yet..'

  // Answers to the QNA thread
  if(thread.isAnswered){
    answerStyle = {
      color: 'green',
    };
    isAnswered = 'This question is answered'
  }
  
  return (
    <div className='thread' style={cardStyle}>
      <Link to={`/thread/${thread.category}/${thread.id}`}>
        <div className='content'>
          <div className='row'>
            <p>Category: {thread.category}</p>
            <p>Creation date: {thread.creationDate}</p>
          </div>
          <h4 className='threadTitle'>{thread.title}</h4>
          <p className='threadDescription descriptionStyle'>{thread.description}</p>
          <div className='bottom-row'>
            <p style={answerStyle}>{isAnswered}</p>
            <p className='threadCreator'>Author: {thread.creator.userName}</p>
          </div>
          <br />
        </div>
      </Link>
      <div className='content'>

      <div className='threadButtons'>
        <Link to={`/edit-thread/${thread.category}/${thread.id}`} className='btn'>Edit</Link>
        <Link to={`/thread/${thread.category}/${thread.id}`} className='btn'>Read more</Link>
        <button onClick={handleDelete} className="btn">Delete</button>
      </div>
      </div>
    </div>
  );
}

export default QnaThreadsComponent;
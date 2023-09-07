import React from 'react';
import { Thread } from '../../types';
import { Link } from 'react-router-dom';
import threadsService from '../../store/service/threadsService';
import { useDispatch } from 'react-redux';
import { removeThread } from '../../store/slices/threadsSlice';


interface ThreadsProps {
  thread: Thread;
  index: number; // Add an index prop to determine even/odd
}



const ThreadsComponent: React.FC<ThreadsProps> = ({ thread, index }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await threadsService.deleteThread(String(thread.id) , thread);
      console.log('Thread deleted successfully');
      dispatch(removeThread(String(thread.id)));
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  }

  const cardStyle = {
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
  };

  
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
          <p className='threadCreator'>Author: {thread.creator.userName}</p>
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

export default ThreadsComponent;
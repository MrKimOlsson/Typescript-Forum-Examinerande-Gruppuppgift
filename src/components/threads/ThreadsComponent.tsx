import React from 'react';
import { Thread } from '../../types';
import { Link } from 'react-router-dom';
import threadsService from '../../service/threadsService';
import { useDispatch } from 'react-redux';
import { removeThread } from '../../store/threadsSlice';
import './threadsComponent.css'


interface ThreadsProps {
  thread: Thread;
  index: number; // Add an index prop to determine even/odd
}

const ThreadsComponent: React.FC<ThreadsProps> = ({ thread, index }) => {
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

  // const descriptionStyle = {
  //   maxHeight: '95px',
  //   overflow: 'hidden',
  //   opacity: .4,
  //   color: 'black',
  // };

  
  

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
          <p className='threadCreator'>Creator: {thread.creator.userName}</p>
          <br />
        </div>
      </Link>
      <div className='content'>

      <div className='threadButtons'>
        <Link to={`/edit-thread/${thread.category}/${thread.id}`} className='btn'>Edit</Link>
        <button onClick={handleDelete} className="btn">Delete</button>
      </div>
      </div>
    </div>
  );
}

export default ThreadsComponent;
import React from 'react'
import { Thread } from '../../types'
import { Link } from 'react-router-dom';
import threadsService from '../../service/threadsService'
import { useDispatch } from 'react-redux';
import {removeThread} from '../../store/threadsSlice'

interface ThreadsProps {
  thread: Thread;
}

const ThreadsComponent: React.FC<ThreadsProps> = ({ thread }) => {
  console.log(thread)

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await threadsService.deleteThread(String(thread.id));
      console.log('Thread deleted successfully');

      dispatch(removeThread(String(thread.id))); 

    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  }
  return (
    <div className='thread'>
      <Link to={`/thread/${thread.category}/${thread.id}`}>
        <h4 className='productTitle'>Title: {thread.title}</h4>
        <p>Thread description: {thread.description}</p>
        <p>Category{thread.category}</p>
        <p>Creation date{thread.creationDate}</p>
        <p>Thread ID: {thread.id}</p>
        <br />
        <p><strong>Thread Creator</strong></p>
        <p>Name: {thread.creator.name}</p>
        <p>Username: {thread.creator.userName}</p>
        <p>ID: {thread.creator.id}</p>
      </Link>
      <Link to={`/edit-thread/${thread.id}`} className='edit-link'>Edit</Link>
      <button onClick={handleDelete}>Delete</button> {/* Add the delete button */}
    </div>
  )
}

export default ThreadsComponent
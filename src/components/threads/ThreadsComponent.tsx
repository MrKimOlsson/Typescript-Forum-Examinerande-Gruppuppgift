import React from 'react'
import { Thread } from '../../types'
import { Link } from 'react-router-dom';

interface ThreadsProps {
    thread: Thread;
  }

const ThreadsComponent: React.FC<ThreadsProps> = ({ thread }) => {
    console.log(thread)
  return (
    <div className='thread'>
      <Link to={`/thread/${thread.id}`}>
        <h4 className='productTitle'>Title: {thread.title}</h4>
        <p>Thread description: {thread.description}</p>
        <p>Category{thread.category}</p>
        <p>Creation date{thread.creationDate}</p>
        <p>Thread ID: {thread.id}</p>
        <br/>
        <p><strong>Thread Creator</strong></p>
        <p>Name: {thread.creator.name}</p>
        <p>Username: {thread.creator.userName}</p>
        <p>ID: {thread.creator.id}</p>
      </Link>
    </div>
  )
}

export default ThreadsComponent
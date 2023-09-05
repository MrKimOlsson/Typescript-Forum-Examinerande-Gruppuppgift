import React from 'react'
import useDoc from '../../hooks/useDoc';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';

const QnaThread = () => {


  type RouteParams = {
    id: string;
  };
  
  const { id } = useParams<RouteParams>();



    const { data: thread, error, loading } = useDoc('threads', id || '');
  if (id === undefined) {
    console.error('Failed to get the thread');
    return <p>Thread ID is missing</p>;
    
  }

  if (!thread) {
    console.log('No thread found')
    return (
      <div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    );
  }
  return (
    <div className='wrapper'>
      <div className='thread'>
        <h4>Title: Whatever{thread.title}</h4>
        <p>Thread description: {thread.description}</p>
        <p>Category{thread.category}</p>
        <p>Creation date{thread.creationDate}</p>
        <p>Thread ID: {thread.id}</p>
        <br/>
        <p><strong>Thread Creator</strong></p>
        {/* <p>Name: {thread.creator.name}</p>
        <p>Username: {thread.creator.userName}</p>
        <p>ID: {thread.creator.id}</p> */}
      </div>    

      <div className='thread'>
        <h4>Comment:</h4>
        <p>Render the comments in these cards:<br />
            1-fetch the comments on this page.<br />
            2-map through the comments and pass
            them to a comment component,
            to render the comments one by one after the thread on top.
        </p>
      </div>       
    </div>
  )
}

export default QnaThread
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchQnaThreads from '../components/threads/FetchThreads'; // Update the import
import QnaThreadsComponent from '../components/threads/ThreadsComponent';

const Qna = () => {

  const threadsList = useSelector((state: RootState) => state.threads.threadsList);

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>QNA threads</h2>
      </div>
      {/* Pass 'categoryName' to the FetchThreads component */}
      <FetchQnaThreads category={'qna'} /> {/* Update the component name here */}
      {threadsList.length > 0 ? (
        threadsList.map((thread, index) => (
          <QnaThreadsComponent key={thread.id} thread={thread} index={index} />
        ))
      ) : (
        <h2>No threads to show</h2>
      )}
      <div></div>
    </div>
  );
}

export default Qna;

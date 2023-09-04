import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index'; // Make sure RootState includes both slices
import FetchQnaThreads from '../../components/threads/FetchQnaThreads';
import ThreadsComponent from '../../components/threads/ThreadsComponent';

const Qna = () => {
  const qnaThreadsList = useSelector((state: RootState) => state.qnaThreads.qnaThreadsList);

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>QNA threads</h2>
      </div>
      <FetchQnaThreads />
      {qnaThreadsList.length > 0 ? (
        qnaThreadsList.map((thread, index) => ( // Include the 'index' prop
          <ThreadsComponent key={thread.id} thread={thread} index={index} /> // Pass the 'index' prop
        ))
      ) : (
        <h2>No threads to show</h2>
      )}
      <div></div>
    </div>
  );
}

export default Qna;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchQnaThreads from '../components/threads/FetchQnaThreads';
import QnaThreadsComponent from '../components/threads/QnaThreadsComponent';
import { QNAThread } from '../types';

const Qna = () => {

  // const qnaThreadsList = useSelector((state: RootState) => state.qna.qnaThreadsList as {qnaThreadsList: QNAThread[]}).qnaThreadsList);
  // Use a type guard to check if qnaThreadsList is an array of QNAThread
  const qnaThreadsList = useSelector((state: RootState) => {
    if (Array.isArray(state.qna.qnaThreadsList)) {
      return state.qna.qnaThreadsList as QNAThread[];
    }
    // Handle the case where qnaThreadsList is not an array of QNAThread
    return [];
  });

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>QNA threads</h2>
      </div>
      {/* Pass 'categoryName' to the FetchThreads component */}
      <FetchQnaThreads/> {/* Update the component name here */}
      {qnaThreadsList.length > 0 ? (
        qnaThreadsList.map((thread: QNAThread, index: number) => (
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

import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import FetchQnaThreads from '../../components/threads/FetchGeneralThreads'
import ThreadsComponent from '../../components/threads/ThreadsComponent';

const Qna = () => {
  const threadsList = useSelector((state: RootState) => state.threads.threadsList);

  return (
    <div className='wrapper'>
        <h2>QNA threads</h2>
        <FetchQnaThreads />
          {threadsList.length > 0 ? (
          threadsList.map(thread => <ThreadsComponent key={thread.id} thread={thread} />)
        ) : (
          <h2>No products to show</h2>
        )}

        <div></div>
    </div>
  )
}

export default Qna
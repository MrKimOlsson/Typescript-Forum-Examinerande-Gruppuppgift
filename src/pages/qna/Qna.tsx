import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index'; // Make sure RootState includes both slices
import FetchQnaThreads from '../../components/threads/FetchQnaThreads';
import ThreadsComponent from '../../components/threads/ThreadsComponent';

const Qna = () => {
  const qnaThreadsList = useSelector((state: RootState) => state.qnaThreads.qnaThreadsList);

  return (
    <div className='wrapper'>
      <h2>QNA threads</h2>
      <FetchQnaThreads />
      {qnaThreadsList.length > 0 ? (
        qnaThreadsList.map(thread => <ThreadsComponent key={thread.id} thread={thread} />)
      ) : (
        <h2>No products to show</h2>
      )}
      <div></div>
    </div>
  );
}

export default Qna;

// import React from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/index';
// import FetchQnaThreads from '../../components/threads/FetchQnaThreads'
// import ThreadsComponent from '../../components/threads/ThreadsComponent';

// const Qna = () => {
//   const qnaThreadsList = useSelector((state: RootState) => state.qnaThreads.qnaThreadsList);

//   return (
//     <div className='wrapper'>
//         <h2>QNA threads</h2>
//         <FetchQnaThreads />
//           {qnaThreadsList.length > 0 ? (
//           qnaThreadsList.map(thread => <ThreadsComponent key={thread.id} thread={thread} />)
//         ) : (
//           <h2>No products to show</h2>
//         )}

//         <div></div>
//     </div>
//   )
// }

// export default Qna
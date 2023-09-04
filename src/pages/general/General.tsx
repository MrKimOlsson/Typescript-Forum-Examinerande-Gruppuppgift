import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import FetchGeneralThreads from '../../components/threads/FetchGeneralThreads';
import ThreadsComponent from '../../components/threads/ThreadsComponent';

const General = () => {
  const threadsList = useSelector((state: RootState) => state.threads.threadsList);

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>General threads</h2>  
      </div>
      <FetchGeneralThreads />
      {threadsList.length > 0 ? (
        threadsList.map((thread, index) => ( // Include the 'index' prop
          <ThreadsComponent key={thread.id} thread={thread} index={index} /> // Pass the 'index' prop
        ))
      ) : (
        <h2>No threads to show</h2>
      )}
      <div></div>
    </div>
  );
};

export default General;

// import React from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/index';
// import FetchGeneralThreads from '../../components/threads/FetchGeneralThreads'
// import ThreadsComponent from '../../components/threads/ThreadsComponent';

// const General = () => {
//   const threadsList = useSelector((state: RootState) => state.threads.threadsList);

//   return (
//     <div className='wrapper'>
//         <h2>General threads</h2>
//         <FetchGeneralThreads />
//           {threadsList.length > 0 ? (
//           threadsList.map(thread => <ThreadsComponent key={thread.id} thread={thread} />)
//         ) : (
//           <h2>No products to show</h2>
//         )}
//         <div></div>
//     </div>
//   )
// }

// export default General
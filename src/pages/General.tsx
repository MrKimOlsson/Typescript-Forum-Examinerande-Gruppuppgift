import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchThreads from '../components/threads/FetchThreads'; // Update the import
import ThreadsComponent from '../components/threads/ThreadsComponent';
import { useParams } from 'react-router-dom';

const General = () => {

    const { category } = useParams<{ category: string }>();
    console.log(category)
    
    const threadsList = useSelector((state: RootState) => state.threads.threadsList);

  // Provide a default value for category in case it's undefined
  const categoryName = category || 'DefaultCategory';

  // Debugging: Log the 'categoryName' to the console to verify it's set correctly.
  console.log('Category:', categoryName);

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>{categoryName} threads</h2>
      </div>
      {/* Pass 'categoryName' to the FetchThreads component */}
      <FetchThreads category={categoryName} /> {/* Update the component name here */}
      {threadsList.length > 0 ? (
        threadsList.map((thread, index) => (
          <ThreadsComponent key={thread.id} thread={thread} index={index} />
        ))
      ) : (
        <h2>No threads to show</h2>
      )}
      <div></div>
    </div>
  );
}

export default General;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/index';
// import FetchGeneralThreads from '../../components/threads/FetchGeneralThreads';
// import ThreadsComponent from '../../components/threads/ThreadsComponent';

// const General = () => {
//   const threadsList = useSelector((state: RootState) => state.threads.threadsList);

//   return (
//     <div className='threadWrapper'>
//       <div className='categoryWrapper'>
//         <h2>General threads</h2>  
//       </div>
//       <FetchGeneralThreads />
//       {threadsList.length > 0 ? (
//         threadsList.map((thread, index) => ( // Include the 'index' prop
//           <ThreadsComponent key={thread.id} thread={thread} index={index} /> // Pass the 'index' prop
//         ))
//       ) : (
//         <h2>No threads to show</h2>
//       )}
//       <div></div>
//     </div>
//   );
// };

// export default General;


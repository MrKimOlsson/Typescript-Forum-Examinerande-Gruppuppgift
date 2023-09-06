import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQnaThreadsList } from '../../store/slices/qnaThreadsSlice';
import threadsService from '../../store/service/threadsService';

// interface Props {
//   category: string;
// }

const FetchQnaThreads = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchAndSetThreads() {
      try {
        const threadsData = await threadsService.fetchQnaThreads('qna');
        dispatch(setQnaThreadsList(threadsData));
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetThreads();
  }, []);

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchQnaThreads;
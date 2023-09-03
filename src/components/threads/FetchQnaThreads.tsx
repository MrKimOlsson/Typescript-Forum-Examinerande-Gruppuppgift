import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQnaThreadsList } from '../../store/qnaThreadsSlice'; // Correct the import path
import threadsService from '../../service/threadsService';
import { Thread } from '../../types';
// import { RootState } from '../../store';


export const FetchQnaThreads = () => {

  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    async function fetchAndSetQnaThreads() {
      try {
        const threadsData = await threadsService.fetchQnaThreads(); // Assuming this returns an array of products

        dispatch(setQnaThreadsList(threadsData)); // Dispatch the action to update the Redux state
        
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetQnaThreads();
  }, []);

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchQnaThreads;
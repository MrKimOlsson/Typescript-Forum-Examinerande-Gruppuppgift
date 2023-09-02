import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThreadsList } from '../../store/threadsSlice'; // Correct the import path
import threadsService from '../../service/threadsService';
import { Thread } from '../../types';
// import { RootState } from '../../store';


export const FetchGeneralThreads = () => {
 
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    async function fetchAndSetGeneralThreads() {
      try {
        const threadsData = await threadsService.fetchGeneralThreads(); // Assuming this returns an array of products

        dispatch(setThreadsList(threadsData)); // Dispatch the action to update the Redux state
        
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetGeneralThreads();
  }, []);

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchGeneralThreads;
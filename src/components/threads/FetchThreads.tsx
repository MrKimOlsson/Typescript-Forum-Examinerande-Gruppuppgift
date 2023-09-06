import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThreadsList } from '../../store/slices/threadsSlice';
import threadsService from '../../store/service/threadsService';

interface Props {
  category: string;
}

const FetchThreads = ({ category }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndSetThreads(category: string) {
      try {
        const threadsData = await threadsService.fetchThreads(category);
        dispatch(setThreadsList(threadsData));
      } catch (error) {
        // Handle error
      }
    }

    fetchAndSetThreads(category);
  }, [category]);

  return <div>{/* You can render something here if needed */}</div>;
};

export default FetchThreads;
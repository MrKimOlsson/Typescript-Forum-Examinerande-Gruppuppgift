import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setThreadsList } from '../../store/slices/threadsSlice';
import threadsService from '../../store/service/threadsService';

interface Props {
  category: string;
}

const FetchThreads = ({ category }: Props) => {

  const dispatch = useDispatch();
  let fetchThreads = threadsService.fetchThreads;
 
  if(category === 'qna'){
    fetchThreads = threadsService.fetchQnaThreads;
   }
  
  
  
  useEffect(() => {
    async function fetchAndSetThreads(category: string) {
      try {
        const threadsData = await fetchThreads(category);
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
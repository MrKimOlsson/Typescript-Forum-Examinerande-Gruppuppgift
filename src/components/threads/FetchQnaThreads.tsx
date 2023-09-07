import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQnaThreadsList } from '../../store/slices/qnaThreadsSlice';
import threadsService from '../../store/service/threadsService';

const FetchQnaThreads = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndSetThreads() {
      try {
        const threadsData = await threadsService.fetchQnaThreads('qna');
        
        // Sortera Q&A-trådarna efter creationDate innan du sparar dem i Redux store
        threadsData.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());

        // Skicka de sorterade Q&A-trådarna till Redux store
        dispatch(setQnaThreadsList(threadsData));
      } catch (error) {
        // Hantera fel
      }
    }

    fetchAndSetThreads();
  }, [dispatch]);

  return <></>;
};

export default FetchQnaThreads;

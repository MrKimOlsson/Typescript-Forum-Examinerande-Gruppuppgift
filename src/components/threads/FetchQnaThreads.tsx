import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQnaThreadsList } from '../../store/slices/qnaThreadsSlice';
import threadsService from '../../store/service/threadsService';
import { QNAThread, Thread } from '../../types';

const FetchQnaThreads = () => {
  const dispatch = useDispatch();
  const [sortedThreads, setSortedThreads] = useState<QNAThread[]>([]); // State för att lagra sorterade Q&A-trådar

  useEffect(() => {
    async function fetchAndSetThreads() {
      try {
        const threadsData = await threadsService.fetchQnaThreads('qna');
        
        // Sortera Q&A-trådarna efter creationDate innan du sparar dem i state
        threadsData.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        setSortedThreads(threadsData);

        // Skicka de sorterade Q&A-trådarna till Redux store
        dispatch(setQnaThreadsList(threadsData));
      } catch (error) {
        // Hantera fel
      }
    }

    fetchAndSetThreads();
  }, [dispatch]);

  return <div>{/* Du kan rendera Q&A-trådarna här om du vill */}</div>;
};

export default FetchQnaThreads;

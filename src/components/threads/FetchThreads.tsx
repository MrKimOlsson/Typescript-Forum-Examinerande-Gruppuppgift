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

        // Sortera trådarna efter creationDate innan du sparar dem i Redux store
        threadsData.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        
        // Skicka de sorterade trådarna till Redux store direkt
        dispatch(setThreadsList(threadsData));
      } catch (error) {
        // Hantera fel
      }
    }

    fetchAndSetThreads(category);
  }, [category, dispatch]);

  return <></>;
};

export default FetchThreads;

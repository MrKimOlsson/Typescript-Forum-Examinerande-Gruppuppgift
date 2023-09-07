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

// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setThreadsList } from '../../store/slices/threadsSlice';
// import threadsService from '../../store/service/threadsService';
// import { Thread } from '../../types';

// interface Props {
//   category: string;
// }

// const FetchThreads = ({ category }: Props) => {
//   const dispatch = useDispatch();
//   const [sortedThreads, setSortedThreads] = useState<Thread[]>([]); // State för att lagra sorterade trådar

//   let fetchThreads = threadsService.fetchThreads;

//   if (category === 'qna') {
//     fetchThreads = threadsService.fetchQnaThreads;
//   }

//   useEffect(() => {
//     async function fetchAndSetThreads(category: string) {
//       try {
//         const threadsData = await fetchThreads(category);
//         // Sortera trådarna efter creationDate innan du sparar dem i state
//         threadsData.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
//         setSortedThreads(threadsData);
//         // console.log('Sorterade trådar:', threadsData);
//       } catch (error) {
//         // Hantera fel
//       }
//     }

//     fetchAndSetThreads(category);
//   }, [category]);

//   // När trådarna är sorterade, kan du skicka dem till Redux store
//   useEffect(() => {
//     dispatch(setThreadsList(sortedThreads));
//   }, [dispatch, sortedThreads]);

//   return <></>;
// };

// export default FetchThreads;

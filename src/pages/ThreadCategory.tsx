import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import FetchThreads from '../components/threads/FetchThreads'; // Update the import
import ThreadsComponent from '../components/threads/ThreadsComponent';
import { useParams } from 'react-router-dom';
import { CategoryProps } from '../types';
import { Thread } from '../types';

const ThreadCategory = () => {

    const { category } = useParams<CategoryProps>();
    // If no category, '' will be combined with 'threads' in the fetchThreads component and get the 'threads' collection,
    // threads collection contains all threads with no category.
    const [currentCategory, setCategory] = useState(category || '');

    // const threadsList = useSelector((state: RootState) => (state.threads as {threadsList: Thread[] }).threadsList);

    // Use a type guard to check if threadsList is an array of Thread
    const threadsList = useSelector((state: RootState) => {
      if (Array.isArray(state.threads.threadsList)) {
        return state.threads.threadsList as Thread[];
      }
    // Handle the case where ThreadsList is not an array of Thread
      return [];
    });

    // Use useEffect to update the category state when category changes
    useEffect(() => {
      if (category !== undefined) {
        setCategory(category);
      }
    }, [category]);

    let categoryTitle = '';

    console.log(category)
    if(category === 'general'){
      categoryTitle = 'General'
    }
    else if(category === 'news'){
      categoryTitle = 'News'
    }
    else if(category === 'sports'){
      categoryTitle = 'Sports'
    }
    else if(category === 'politics'){
      categoryTitle = 'Politics'
    }
    else if(category === 'other'){
      categoryTitle = 'Other'
    }

  return (
    <div className='threadWrapper'>
      <div className='categoryWrapper'>
        <h2>{categoryTitle}</h2>
      </div>
      {/* Pass 'currentCategory' to the FetchThreads component to get the correct threads list */}
      <FetchThreads category={currentCategory} />
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

export default ThreadCategory;
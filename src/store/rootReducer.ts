import { combineReducers } from 'redux';
import threadsReducer from '../store/threadsSlice';
import commentsSlice from './commentsSlice';
import qnaThreadsReducer from './qnaThreadsSlice';
// Import other reducers

const rootReducer = combineReducers({
  threads: threadsReducer,
  qnaThreads: qnaThreadsReducer,
  comments: commentsSlice,
  // Add other reducers here
});

export default rootReducer;

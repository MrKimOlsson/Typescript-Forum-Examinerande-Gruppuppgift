import { combineReducers } from 'redux';
import threadsReducer from '../store/threadsSlice';
import qnaThreadsReducer from './qnaThreadsSlice';
// Import other reducers

const rootReducer = combineReducers({
  threads: threadsReducer,
  qnaThreads: qnaThreadsReducer,
  // Add other reducers here
});

export default rootReducer;

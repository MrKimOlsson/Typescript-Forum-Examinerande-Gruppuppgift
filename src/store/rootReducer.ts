import { combineReducers } from 'redux';
import threadsReducer from '../store/threadsSlice';
// Import other reducers

const rootReducer = combineReducers({
  threads: threadsReducer,
  // Add other reducers here
});

export default rootReducer;

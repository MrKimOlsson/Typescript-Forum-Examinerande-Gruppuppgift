import { combineReducers } from 'redux';
import threadsReducer from '../store/slices/threadsSlice';
import commentsSlice from '../store/slices/commentsSlice';

const rootReducer = combineReducers({
  threads: threadsReducer,
  comments: commentsSlice,
});

export default rootReducer;

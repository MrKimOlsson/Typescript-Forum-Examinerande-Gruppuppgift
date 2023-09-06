import { combineReducers } from 'redux';
import threadsReducer from '../store/slices/threadsSlice';
import qnaThreadsReducer from './slices/qnaThreadsSlice';
import commentsSlice from '../store/slices/commentsSlice';

const rootReducer = combineReducers({
  threads: threadsReducer,
  qna: qnaThreadsReducer,
  comments: commentsSlice,
});

export default rootReducer;

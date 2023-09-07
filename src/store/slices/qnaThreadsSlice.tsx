import threadsService from "../service/threadsService";
import { QNAThread } from '../../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
  message: string;
}

interface ThreadsState {
  qnaThreadsList: QNAThread[];
  error: string | null;
  loading: boolean;
}

const initialState: ThreadsState = {
  qnaThreadsList: [],
  error: null,
  loading: false,
};

export const getQnaThreads = createAsyncThunk(
  'qnathreads/getAll',
  async (category: string, thunkAPI) => {
    try {
      return await threadsService.fetchQnaThreads(category);
    } catch (err) {
      return thunkAPI.rejectWithValue((err as Error).message);
    }
  }
);

const qnaThreadsSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    setQnaThreadsList: (state, action: PayloadAction<QNAThread[]>) => {
      state.qnaThreadsList = action.payload;
    },
    removeQnaThread: (state, action: PayloadAction<string>) => {
      state.qnaThreadsList = state.qnaThreadsList.filter(thread => thread.id !== Number(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQnaThreads.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQnaThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.qnaThreadsList = action.payload;
      })
      .addCase(getQnaThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as Error).message;
      });
  },
});

export const { setQnaThreadsList, removeQnaThread } = qnaThreadsSlice.actions;

export default qnaThreadsSlice.reducer;
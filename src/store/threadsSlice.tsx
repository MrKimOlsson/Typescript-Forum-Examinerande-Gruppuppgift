import threadsService from "../service/threadsService";
import { Thread } from '../types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
  message: string;
}

interface ThreadsState {
  threadsList: Thread[];
  error: string | null;
  loading: boolean;
}

const initialState: ThreadsState = {
  threadsList: [],
  error: null,
  loading: false,
};


export const getThreads = createAsyncThunk(
  'threads/getAll',
  async (_, thunkAPI) => {
    try {
      return await threadsService.fetchGeneralThreads();
    } catch (err) {
      return thunkAPI.rejectWithValue((err as Error).message);
    }
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreadsList: (state, action: PayloadAction<Thread[]>) => {
      state.threadsList = action.payload;
    },
    removeThread: (state, action: PayloadAction<string>) => {
      state.threadsList = state.threadsList.filter(thread => thread.id !== Number(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getThreads.pending, (state) => {
        state.loading = true;
      })
      .addCase(getThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.threadsList = action.payload;
      })
      .addCase(getThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as Error).message;
      });
  },
});

export const { setThreadsList, removeThread } = threadsSlice.actions;

export default threadsSlice.reducer;
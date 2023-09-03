import threadsService from "../service/threadsService";
import { Thread } from '../types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
    message: string;
  }

interface ThreadsState {
    qnaThreadsList: Thread[];
    error: string | null;
    loading: boolean;
  }

const initialState: ThreadsState = {
    qnaThreadsList: [],
    error: null,
    loading: false,
  };


  // export const getQnaThreads = createAsyncThunk(
  //   'qnathreads/getAll',
  //   async (_, thunkAPI) => {
  //     try {
  //       return await threadsService.fetchQnaThreads();
  //     } catch (err) {
  //       return thunkAPI.rejectWithValue((err as Error).message);
  //     }
  //   }
  // );

  export const getQnaThreads = createAsyncThunk(
    'qnathreads/getAll',
    async (_, thunkAPI) => {
      try {
        const response = await threadsService.fetchQnaThreads();
        return response;
      } catch (err) {
        return Promise.reject((err as Error).message); // Explicitly return a rejected promise
      }
    }
  );

const qnaThreadsSlice = createSlice({
    name: 'qnathreads',
    initialState,
    reducers: {
      setQnaThreadsList: (state, action: PayloadAction<Thread[]>) => {
        state.qnaThreadsList = action.payload;
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

    export const { setQnaThreadsList } = qnaThreadsSlice.actions;

export default qnaThreadsSlice.reducer;
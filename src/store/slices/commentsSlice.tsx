import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/types';
import { getCommentsByThreadId, deleteComment as deleteCommentService } from '../service/commentsService';

export const fetchCommentsByThreadId = createAsyncThunk(
  'comments/fetchCommentsByThreadId',
  async (threadId: number) => {
    const comments = await getCommentsByThreadId(threadId.toString());
    return comments;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteCommentAsync',
  async (id: number, { dispatch }) => {
    try {
      await deleteCommentService(id);
      dispatch(deleteComment(id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
);

const initialState = {
  comments: [] as Comment[],
  loading: false,
  error: null as string | null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByThreadId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByThreadId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByThreadId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCommentAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;

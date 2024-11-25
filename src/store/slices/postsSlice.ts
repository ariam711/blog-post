import { Post, PostFormData } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsApi } from '@svc/api/posts';
import { WritableDraft } from 'immer';

/**
 * Interface representing the state of posts.
 */
interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  error: string | null;
}

/**
 * Initial state for the posts slice.
 */
const INITIAL_STATE: PostsState = {
  items: [],
  status: 'idle',
  error: null
};

/**
 * Async thunk to fetch posts.
 * @returns {Promise<Post[]>} - The fetched posts.
 */
export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await PostsApi.fetchPosts();
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

/**
 * Async thunk to create a new post.
 * @param {PostFormData} postData - The data for the new post.
 * @returns {Promise<Post>} - The created post.
 */
export const createPostAsync = createAsyncThunk(
  'posts/createPost',
  async (postData: PostFormData, { rejectWithValue }) => {
    try {
      const response = await PostsApi.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Async thunk to update an existing post.
 * @param {Object} params - The parameters for updating the post.
 * @param {number} params.id - The ID of the post to update.
 * @param {PostFormData} params.postData - The updated data for the post.
 * @returns {Promise<Post>} - The updated post.
 */
export const updatePostAsync = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }: { id: number; postData: PostFormData }, { rejectWithValue }) => {
    try {
      const response = await PostsApi.updatePost(id, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Async thunk to delete a post.
 * @param {number} id - The ID of the post to delete.
 * @returns {Promise<number>} - The ID of the deleted post.
 */
export const deletePostAsync = createAsyncThunk('posts/deletePost', async (id: number, { rejectWithValue }) => {
  try {
    await PostsApi.deletePost(id);
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const loadingCaseReducer = (state: WritableDraft<PostsState>) => {
  state.status = 'loading';
};

/**
 * Slice for managing posts state.
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
  reducers: {
    resetMessage(state) {
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, loadingCaseReducer)
      .addCase(createPostAsync.pending, loadingCaseReducer)
      .addCase(updatePostAsync.pending, loadingCaseReducer)
      .addCase(deletePostAsync.pending, loadingCaseReducer)
      .addCase(fetchPostsAsync.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = 'error';
        state.message = 'We cannot fetch the posts at this time. Please try again later.';
        state.error = action.payload as string;
      })
      .addCase(createPostAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
        state.status = 'success';
        state.message = 'Post created successfully';
      })
      .addCase(updatePostAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.status = 'success';
          state.message = 'Post updated successfully';
        }
      })
      .addCase(updatePostAsync.rejected, (state) => {
        state.status = 'error';
        state.message = 'We cannot update the post at this time. Please try again later.';
        state.error = '';
      })
      .addCase(deletePostAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
        state.status = 'success';
        state.message = 'Post deleted successfully';
      });
  }
});

/**
 * Exports the posts reducer.
 */
export default postsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

/**
 * Configures and creates the Redux store.
 * @returns {EnhancedStore} - The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});

/**
 * Type representing the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

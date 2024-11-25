import { Post, PostFormData } from '@/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createPostAsync, deletePostAsync, fetchPostsAsync, updatePostAsync } from '@store/slices/postsSlice';
import { useCallback } from 'react';
import { UnknownAction } from 'redux';

// Define an interface for the hook's return type
interface UsePosts {
  posts: Post[];
  status: string;
  error: string | null;
  fetchPosts: () => void;
  createPost: (postData: PostFormData) => void;
  updatePost: (data: { id: number; postData: PostFormData }) => void;
  deletePost: (id: number) => void;
}

/**
 * Custom hook to create a memoized async action dispatcher.
 *
 * @template T - The type of the action argument.
 * @param {function(T): void} action - The async action to dispatch.
 * @returns {function(T): void} - The memoized dispatcher function.
 */
const useAsyncAction = <T>(action: (arg: T) => void): ((arg0: T) => void) => {
  const dispatch = useAppDispatch();
  return useCallback((arg: T) => dispatch(action(arg) as unknown as UnknownAction), [dispatch, action]);
};

/**
 * Custom hook to manage posts state and actions.
 *
 * @returns {UsePosts} - The posts state and action handlers.
 */
export const usePosts = (): UsePosts => {
  const { items: posts, status, error } = useAppSelector((state) => state.posts);

  const fetchPosts = useAsyncAction<void>(fetchPostsAsync);
  const createPost = useAsyncAction<PostFormData>(createPostAsync);
  const updatePost = useAsyncAction<{ id: number; postData: PostFormData }>(updatePostAsync);
  const deletePost = useAsyncAction<number>(deletePostAsync);

  return {
    posts,
    status,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost
  };
};

import { ITEMS_PER_PAGE } from '@/constants';
import { Post, PostFormData } from '@/types';
import { usePosts } from '@hook/usePosts';
import { useCallback, useEffect, useState } from 'react';

/**
 * Interface for the return type of the usePaginatedPosts hook.
 */
interface UsePaginatedPosts {
  displayedPosts: Post[];
  status: string;
  error: string | null;
  createPost: (postData: PostFormData) => void;
  updatePost: (data: { id: number; postData: PostFormData }) => void;
  deletePost: (id: number) => void;
  loadMore: () => void;
}

/**
 * Custom hook to manage paginated posts state and actions.
 *
 * @returns {UsePaginatedPosts} - The paginated posts state and action handlers.
 */
export const usePaginatedPosts = (): UsePaginatedPosts => {
  const { posts, status, error, fetchPosts, createPost, updatePost, deletePost } = usePosts();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (status === 'idle') {
      fetchPosts();
    }
  }, [status, fetchPosts]);

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, page * ITEMS_PER_PAGE));
  }, [posts, page]);

  /**
   * Function to load more posts by increasing the page number.
   */
  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return {
    displayedPosts,
    status,
    error,
    createPost,
    updatePost,
    deletePost,
    loadMore
  };
};

import { Comment } from '@/types';
import { PostsApi } from '@svc/api/posts';
import { useCallback, useEffect, useState } from 'react';

/**
 * Interface for the return type of the useComments hook.
 */
interface UseComments {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  fetchComments: (postId: number) => void;
}

/**
 * Custom hook to manage comments state and actions.
 *
 * @param {number | null} postId - The ID of the post to fetch comments for.
 * @returns {UseComments} - The comments state and action handlers.
 */
export const useComments = (postId: number | null): UseComments => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to fetch comments for a specific post.
   *
   * @param {number} postId - The ID of the post to fetch comments for.
   */
  const fetchComments = useCallback(async (postId: number) => {
    setLoading(true);
    try {
      const response = await PostsApi.fetchComments(postId);
      setComments(response.data);
      setError(null);
    } catch (e) {
      setError('Failed to load comments');
      console.error('Failed to load comments:', (e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (postId !== null) {
      fetchComments(postId);
    }
  }, [postId, fetchComments]);

  return { comments, loading, error, fetchComments };
};

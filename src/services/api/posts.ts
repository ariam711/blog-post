import { ApiResponse, Comment, Post, PostFormData } from '@/types';
import { apiService } from '../common/base';

/**
 * API methods for managing posts and comments.
 */
export const PostsApi = {
  /**
   * Fetches all posts.
   * @returns {Promise<ApiResponse<Post[]>>} - The API response containing an array of posts.
   */
  fetchPosts: (): Promise<ApiResponse<Post[]>> => apiService.get<Post[]>('/posts'),

  /**
   * Fetches a single post by ID.
   * @param {number} id - The ID of the post to fetch.
   * @returns {Promise<ApiResponse<Post>>} - The API response containing the post.
   */
  fetchPost: (id: number): Promise<ApiResponse<Post>> => apiService.get<Post>(`/posts/${id}`),

  /**
   * Creates a new post.
   * @param {PostFormData} postData - The data for the new post.
   * @returns {Promise<ApiResponse<Post>>} - The API response containing the created post.
   */
  createPost: (postData: PostFormData): Promise<ApiResponse<Post>> => apiService.post<Post>('/posts', postData),

  /**
   * Updates an existing post by ID.
   * @param {number} id - The ID of the post to update.
   * @param {PostFormData} postData - The updated data for the post.
   * @returns {Promise<ApiResponse<Post>>} - The API response containing the updated post.
   */
  updatePost: (id: number, postData: PostFormData): Promise<ApiResponse<Post>> =>
    apiService.put<Post>(`/posts/${id}`, postData),

  /**
   * Deletes a post by ID.
   * @param {number} id - The ID of the post to delete.
   * @returns {Promise<ApiResponse<object>>} - The API response confirming the deletion.
   */
  deletePost: (id: number): Promise<ApiResponse<object>> => apiService.delete<object>(`/posts/${id}`),

  /**
   * Fetches comments for a specific post.
   * @param {number} postId - The ID of the post for which to fetch comments.
   * @returns {Promise<ApiResponse<Comment[]>>} - The API response containing an array of comments.
   */
  fetchComments: (postId: number): Promise<ApiResponse<Comment[]>> =>
    apiService.get<Comment[]>(`/posts/${postId}/comments`)
};

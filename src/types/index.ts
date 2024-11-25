/**
 * Represents a blog post.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * Represents the data required to create or update a blog post.
 */
export interface PostFormData {
  title: string;
  body: string;
}

/**
 * Represents a comment on a blog post.
 */
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Represents a generic API response.
 *
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Represents a notification message.
 */
export interface Notification {
  message: string;

  /**
   * The severity level of the notification.
   * Can be one of 'success', 'error', 'warning', or 'info'.
   */
  severity: 'success' | 'error' | 'warning' | 'info';
}

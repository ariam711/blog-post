/**
 * Custom error class for API errors.
 */
export class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} status - The HTTP status code.
   * @param {string} message - The error message.
   */
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'API_ERROR';
  }
}

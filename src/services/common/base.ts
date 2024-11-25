import { API_BASE_URL } from '@/constants';
import { ApiResponse } from '@/types';
import { ApiError } from './apiError';

/**
 * Interface for API configuration.
 */
interface ApiConfig {
  baseUrl: string;
}

/**
 * Interface for API service.
 */
interface IApiService {
  /**
   * Sends a GET request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>;

  /**
   * Sends a POST request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<ApiResponse<T>>;

  /**
   * Sends a PUT request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  put<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<ApiResponse<T>>;

  /**
   * Sends a DELETE request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>;
}

/**
 * API service class implementation.
 */
export class ApiService implements IApiService {
  private config: ApiConfig;

  /**
   * Creates an instance of ApiService.
   * @param {ApiConfig} config - The API configuration.
   */
  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Sends an HTTP request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   * @throws {ApiError} - If the response is not OK.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError(response.status, `API error: ${response.statusText}`);
    }

    const data: T = await response.json();
    return { data };
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  public get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Sends a POST request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  public post<T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(body)
    });
  }

  /**
   * Sends a PUT request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  public put<T>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(body)
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestInit} [options] - Optional request options.
   * @returns {Promise<ApiResponse<T>>} - The API response.
   */
  public delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Instance of the API service with the base URL.
 */
export const apiService = new ApiService({ baseUrl: API_BASE_URL });

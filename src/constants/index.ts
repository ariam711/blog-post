import * as process from 'process';

/**
 * Environment variables.
 *
 * @constant {Object} Env
 * @property {string} BASE_URL - The base URL for the API.
 */
const Env = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'
} as const;

/**
 * The base URL for the API.
 *
 * @constant {string} API_BASE_URL
 */
export const API_BASE_URL = Env.BASE_URL;

/**
 * The number of items per page.
 *
 * @constant {number} ITEMS_PER_PAGE
 */
export const ITEMS_PER_PAGE = 10;

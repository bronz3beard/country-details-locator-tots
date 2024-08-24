import { AxiosRequestConfig } from 'axios';
import { backendUrl } from '~/shared/environment-variables';

/**
 * Mock function for single GET requests.
 * @usage
 * ```typescript
 * mockSingleGetRequest.mockResolvedValueOnce(mockData);
 * const response = await singleGetRequest('/api/resource', config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const mockSingleGetRequest = jest.fn();

/**
 * Mock function for single POST requests.
 * @usage
 * ```typescript
 * mockSinglePostRequest.mockResolvedValueOnce(mockData);
 * const response = await singlePostRequest('/api/resource', postData, config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const mockSinglePostRequest = jest.fn();

/**
 * Mock function for single PUT requests.
 * @usage
 * ```typescript
 * mockSinglePutRequest.mockResolvedValueOnce(mockData);
 * const response = await singlePutRequest('/api/resource', putData, config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const mockSinglePutRequest = jest.fn();

/**
 * Mock function for DELETE requests.
 * @usage
 * ```typescript
 * mockDeleteRequest.mockResolvedValueOnce(mockData);
 * const response = await deleteRequest('/api/resource', config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const mockDeleteRequest = jest.fn();

/**
 * Fetcher function using single GET request.
 * @param {string} url - The endpoint URL.
 * @returns {Promise<any>} - The response data.
 * @usage
 * ```typescript
 * mockSingleGetRequest.mockResolvedValueOnce(mockData);
 * const response = await fetcher('/api/resource');
 * expect(response).toEqual(mockData);
 * ```
 */
export const fetcher = async (url: string) => {
  return mockSingleGetRequest(`${backendUrl}${url}`);
};

/**
 * Single GET request function.
 * @param {string} apiUrl - The API endpoint.
 * @param {AxiosRequestConfig} config - The request configuration.
 * @returns {Promise<any>} - The response data.
 * @usage
 * ```typescript
 * mockSingleGetRequest.mockResolvedValueOnce(mockData);
 * const response = await singleGetRequest('/api/resource', config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const singleGetRequest = async (apiUrl: string, config: AxiosRequestConfig) => {
  return mockSingleGetRequest(apiUrl, config);
};

/**
 * Single POST request function.
 * @param {string} apiUrl - The API endpoint.
 * @param {unknown} data - The request payload.
 * @param {AxiosRequestConfig} config - The request configuration.
 * @returns {Promise<any>} - The response data.
 * @usage
 * ```typescript
 * mockSinglePostRequest.mockResolvedValueOnce(mockData);
 * const response = await singlePostRequest('/api/resource', postData, config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const singlePostRequest = async (apiUrl: string, data: unknown, config: AxiosRequestConfig) => {
  return mockSinglePostRequest(apiUrl, data, config);
};

/**
 * Single PUT request function.
 * @param {string} apiUrl - The API endpoint.
 * @param {unknown} data - The request payload.
 * @param {AxiosRequestConfig} config - The request configuration.
 * @returns {Promise<any>} - The response data.
 * @usage
 * ```typescript
 * mockSinglePutRequest.mockResolvedValueOnce(mockData);
 * const response = await singlePutRequest('/api/resource', putData, config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const singlePutRequest = async (apiUrl: string, data: unknown, config: AxiosRequestConfig) => {
  return mockSinglePutRequest(apiUrl, data, config);
};

/**
 * DELETE request function.
 * @param {string} apiUrl - The API endpoint.
 * @param {AxiosRequestConfig} config - The request configuration.
 * @returns {Promise<any>} - The response data.
 * @usage
 * ```typescript
 * mockDeleteRequest.mockResolvedValueOnce(mockData);
 * const response = await deleteRequest('/api/resource', config);
 * expect(response).toEqual(mockData);
 * ```
 */
export const deleteRequest = async (apiUrl: string, config: AxiosRequestConfig) => {
  return mockDeleteRequest(apiUrl, config);
};

import { config } from '@/config/app';
import axios, { AxiosError } from 'axios';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
});

/* request interceptor to add the access token */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error),
);

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

/* response interceptor to handle token expiration */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) as string;

      /* 401 + refreshToken + not retried, retry. otherwise(404 + no refreshToken + retried), logout */
      if (refreshToken && !originalRequest?._retry) {
        originalRequest!._retry = true;
        localStorage.setItem(ACCESS_TOKEN_KEY, refreshToken);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        return apiClient(originalRequest!);
      } else {
        history.replaceState(null, '', '/');
        return;
      }
    }
    return Promise.reject(error);
  },
);

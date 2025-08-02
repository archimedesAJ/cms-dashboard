export const config = {
  apiBaseUrl:
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
    'https://cms-api-pmb7.onrender.com',
  isDev: import.meta.env.DEV,
} as const;

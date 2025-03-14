export const config = {
  apiBaseUrl:
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    'http://abbeydev.pythonanywhere.com',
  isDev: import.meta.env.DEV,
} as const;

export const config = {
  apiBaseUrl:
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    'https://6095-154-161-27-209.ngrok-free.app',
  isDev: import.meta.env.DEV,
} as const;

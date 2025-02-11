import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { routeTree } from './routeTree.gen';

const MAX_RETRIES = 2;

/* turn off retries for:  
- [BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR] respectively
*/
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404, 500];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false;
        }
        if (
          isAxiosError(error) &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)
        ) {
          return false;
        }
        return true;
      },
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <RouterProvider router={router} />
        </HeroUIProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

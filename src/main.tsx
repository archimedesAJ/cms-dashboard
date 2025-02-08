import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

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

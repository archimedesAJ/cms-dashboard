import { Button } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <Button color="primary">Index Page</Button>
    </div>
  );
}

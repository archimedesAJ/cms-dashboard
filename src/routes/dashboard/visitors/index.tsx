import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/visitors/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Visitors</h2>
    </div>
  );
}

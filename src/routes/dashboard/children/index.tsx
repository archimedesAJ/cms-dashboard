import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/children/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Children</h2>
    </div>
  );
}

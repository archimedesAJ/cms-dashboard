import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/pastors-and-bishops/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Pastors & Bishops</h2>
    </div>
  );
}

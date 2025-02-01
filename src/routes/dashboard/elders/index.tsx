import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/elders/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Elders</h2>
    </div>
  );
}

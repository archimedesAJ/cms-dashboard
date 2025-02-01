import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/deaconesses/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Deaconesses</h2>
    </div>
  );
}

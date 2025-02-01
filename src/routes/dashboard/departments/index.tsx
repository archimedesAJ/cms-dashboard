import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/departments/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Departments</h2>
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/committee/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Committee</h2>
    </div>
  );
}

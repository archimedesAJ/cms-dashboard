import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/members/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Members</h2>
    </div>
  );
}

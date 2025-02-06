import MemberForm from '@/components/member-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/dashboard/members/create')({
  component: () => <MemberForm />,
});

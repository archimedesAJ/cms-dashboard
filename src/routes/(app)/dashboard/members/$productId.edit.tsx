import MemberForm from '@/components/member-form';
import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';

export const Route = createFileRoute(
  '/(app)/dashboard/members/$productId/edit',
)({
  params: {
    parse: (params) => ({
      productId: z.coerce.number().parse(params.productId),
    }),
    stringify: ({ productId }) => ({ productId: `${productId}` }),
  },
  component: () => <MemberForm formMode="update" />,
});

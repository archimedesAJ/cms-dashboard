import { z } from 'zod';

export const ApiLoginPayload = z.object({
  username: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type ApiLoginPayload = z.infer<typeof ApiLoginPayload>;

export const ApiLoginResponse = z.object({
  message: z.string(),
  refresh: z.string(),
  access: z.string(),
});

export const ApiLogoutPayload = z.object({
  refresh: z.string(),
});
export type ApiLogoutPayload = z.infer<typeof ApiLogoutPayload>;

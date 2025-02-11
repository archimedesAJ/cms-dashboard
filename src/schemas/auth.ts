import { z } from 'zod';

/* login api payload schema */
export const Login = z.object({
  username: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type Login = z.infer<typeof Login>;

/* login api response data schema */
export const ApiLoginResponse = z.object({
  message: z.string(),
  refresh: z.string(),
  access: z.string(),
});

import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;

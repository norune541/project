import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .meta({ example: 'user@email.com' })
    .transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72).meta({ example: 'passsword' }),
  username: z.string().trim().min(3).max(32).optional().meta({ example: 'username' }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .meta({ example: 'user@email.com' })
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(72).meta({ example: 'password' }),
});

export type RegisterInputDto = z.infer<typeof registerSchema>;
export type LoginInputDto = z.infer<typeof loginSchema>;

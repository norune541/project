import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email({
    error: 'Некорректный формат email',
  }),
  password: z
    .string()
    .min(8, { error: 'Пароль должен быть от восьми символов' })
    .max(72)
    .meta({ example: 'passsword' }),
  username: z
    .string({ error: 'Пустое имя пользователя' })
    .trim()
    .min(3, { error: 'Минимальное количество символов: 3' })
    .max(32)
    .optional()
    .meta({ example: 'username' }),
});

export const loginSchema = z.object({
  email: z.email({
    error: 'Некорректный формат email',
  }),
  password: z
    .string()
    .min(8, { error: 'Пароль должен быть от восьми символов' })
    .max(72)
    .meta({ example: 'password' }),
});

export type RegisterInputDto = z.infer<typeof registerSchema>;
export type LoginInputDto = z.infer<typeof loginSchema>;

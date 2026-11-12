import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaProvider } from '../../../prisma/prisma.provider.js';
import { UserDao } from '../../users/dao/user.dao.js';
import { UsersService } from '../../users/users.service.js';
import { RegisterUseCase } from '../use-cases/register.use-case.js';
import { LoginUseCase } from '../use-cases/login.use-case.js';

describe('Auth', () => {
  let prisma: PrismaProvider;
  let userDao: UserDao;
  let usersService: UsersService;
  let jwtService: JwtService;
  let registerUseCase: RegisterUseCase;
  let loginUseCase: LoginUseCase;

  beforeAll(async () => {
    prisma = new PrismaProvider();
    await prisma.$connect();

    userDao = new UserDao(prisma);
    usersService = new UsersService(userDao);

    jwtService = new JwtService({
      secret: process.env.JWT_SECRET ?? 'test-secret',
    });

    registerUseCase = new RegisterUseCase(userDao, jwtService);
    loginUseCase = new LoginUseCase(userDao, jwtService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('RegisterUseCase', () => {
    it('should register a user', async () => {
      const result = await registerUseCase.execute({
        email: 'test@example.com',
        password: 'password123',
        username: 'tester',
      });

      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });

      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
      expect(user?.username).toBe('tester');
      expect(user?.password).not.toBe('password123');

      expect(await bcrypt.compare('password123', user!.password)).toBe(true);

      expect(result.accessToken).toBeDefined();
      expect(result.user).not.toHaveProperty('password');
    });

    it('should not register user with existing email', async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'password123',
      });

      await expect(
        registerUseCase.execute({
          email: 'test@example.com',
          password: 'password456',
        }),
      ).rejects.toThrow();
    });
  });

  describe('LoginUseCase', () => {
    it('should login a user', async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'password123',
        username: 'tester',
      });

      const result = await loginUseCase.execute({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.accessToken).toBeDefined();
      expect(result.user.email).toBe('test@example.com');
      expect(result.user).not.toHaveProperty('password');

      const payload = await jwtService.verifyAsync(result.accessToken);

      expect(payload.sub).toBe(result.user.id);
    });

    it('should not login with incorrect password', async () => {
      await registerUseCase.execute({
        email: 'test@example.com',
        password: 'password123',
      });

      await expect(
        loginUseCase.execute({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow();
    });
  });
});

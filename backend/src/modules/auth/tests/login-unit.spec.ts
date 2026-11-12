import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as bcrypt from 'bcrypt';

import { LoginUseCase } from '../use-cases/login.use-case.js';
import { UserDao } from '../../users/dao/user.dao.js';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
}));

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const userDao = {
    findByEmail: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useCase = new LoginUseCase(userDao as unknown as UserDao, jwtService as unknown as JwtService);
  });

  it('should login a user', async () => {
    userDao.findByEmail.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      username: 'tester',
      password: 'hashed-password',
    });

    vi.mocked(bcrypt.compare as any).mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue('jwt-token');

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'test@example.com',
      username: 'tester',
    });
    expect(result.accessToken).toBe('jwt-token');
    expect(result.user).not.toHaveProperty('password');
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    userDao.findByEmail.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      username: 'tester',
      password: 'hashed-password',
    });

    vi.mocked(bcrypt.compare as any).mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);

    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});

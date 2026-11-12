import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as bcrypt from 'bcrypt';

import { RegisterUseCase } from '../use-cases/register.use-case.js';
import { UserDao } from '../../users/dao/user.dao.js';

vi.mock('bcrypt', () => ({
  hash: vi.fn(),
}));

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;

  const userDao = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useCase = new RegisterUseCase(
      userDao as unknown as UserDao,
      jwtService as unknown as JwtService,
    );
  });

  it('should register a user', async () => {
    userDao.findByEmail.mockResolvedValue(null);
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never);

    userDao.create.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      username: 'tester',
      password: 'hashed-password',
    });

    jwtService.signAsync.mockResolvedValue('jwt-token');

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password123',
      username: 'tester',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
    expect(userDao.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashed-password',
      username: 'tester',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'test@example.com',
      username: 'tester',
    });
    expect(result.accessToken).toBe('jwt-token');
    expect(result.user).not.toHaveProperty('password');
  });

  it('should throw ConflictException if email already exists', async () => {
    userDao.findByEmail.mockResolvedValue({
      id: 'existing-id',
      email: 'test@example.com',
    });

    await expect(
      useCase.execute({
        email: 'test@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(ConflictException);

    expect(userDao.create).not.toHaveBeenCalled();
  });
});

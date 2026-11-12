import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LogoutUseCase } from '../use-cases/logout.use-case.js';
import { UserDao } from '../../users/dao/user.dao.js';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;

  const userDao = {
    getUser: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useCase = new LogoutUseCase(userDao as unknown as UserDao);
  });

  it('should logout a user', async () => {
    userDao.getUser.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      username: 'tester',
    });

    userDao.delete.mockResolvedValue(undefined);

    await useCase.execute('user-id');

    expect(userDao.getUser).toHaveBeenCalledWith('user-id');
    expect(userDao.delete).toHaveBeenCalledWith('user-id');
  });

  it('should throw NotFoundException if user does not exist', async () => {
    userDao.getUser.mockResolvedValue(null);

    await expect(useCase.execute('user-id')).rejects.toThrow(NotFoundException);

    expect(userDao.delete).not.toHaveBeenCalled();
  });

  it('should propagate error if deletion fails', async () => {
    userDao.getUser.mockResolvedValue({
      id: 'user-id',
      email: 'test@example.com',
      username: 'tester',
    });

    userDao.delete.mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute('user-id')).rejects.toThrow('Database error');

    expect(userDao.delete).toHaveBeenCalledWith('user-id');
  });
});

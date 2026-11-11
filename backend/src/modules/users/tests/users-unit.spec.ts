import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersService } from '../users.service.js';
import { UserDao } from '../dao/user.dao.js';

describe('UsersService', () => {
  let service: UsersService;
  let userDao: UserDao;

  beforeEach(() => {
    userDao = {
      getUser: vi.fn(),
    } as unknown as UserDao;

    service = new UsersService(userDao);
  });

  describe('create', () => {
    it('should return success message', () => {
      const result = service.create({} as any);

      expect(result).toBe('This action adds a new user');
    });
  });

  describe('findAll', () => {
    it('should return all users message', () => {
      const result = service.findAll();

      expect(result).toBe('This action returns all users');
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      vi.mocked(userDao.getUser).mockResolvedValue(mockUser as any);

      const result = await service.findOne('1');

      expect(userDao.getUser).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user does not exist', async () => {
      vi.mocked(userDao.getUser).mockResolvedValue(null);

      const result = await service.findOne('non-existing-id');

      expect(userDao.getUser).toHaveBeenCalledWith('non-existing-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should return update message', () => {
      const result = service.update(1, {} as any);

      expect(result).toBe('This action updates a #1 user');
    });
  });

  describe('remove', () => {
    it('should return remove message', () => {
      const result = service.remove(1);

      expect(result).toBe('This action removes a #1 user');
    });
  });
});

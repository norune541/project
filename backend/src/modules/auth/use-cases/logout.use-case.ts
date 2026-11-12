import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from '../../users/dao/user.dao.js';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly userDao: UserDao) {}
  async execute(userId: string) {
    const user = await this.userDao.getUser(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    await this.userDao.delete(userId);
  }
}

import { Injectable } from '@nestjs/common';
import { UserDao } from './dao/user.dao.js';

@Injectable()
export class UsersService {
  constructor(private readonly userDao: UserDao) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userDao.getUser(id);
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

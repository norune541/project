import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UserDao } from './dao/user.dao.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { UserDao } from './dao/user.dao.js';
import { PrismaProvider } from '../../prisma/prisma.provider.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDao, PrismaProvider],
})
export class UsersModule {}

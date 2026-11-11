import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { UserDao } from './dao/user.dao.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  imports: [PrismaModule],
})
export class UsersModule {}

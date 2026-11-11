import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';

@Injectable()
export class UserDao {
  constructor(private readonly prisma: PrismaProvider) {}

  async getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';

@Injectable()
export class UserDao {
  constructor(private readonly prisma: PrismaProvider) {}

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: { email: string; password: string; username?: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async delete(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}

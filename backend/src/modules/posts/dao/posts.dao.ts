import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../prisma/prisma.provider.js';

@Injectable()
export class PostsDao {
  constructor(private readonly prisma: PrismaProvider) {}
}

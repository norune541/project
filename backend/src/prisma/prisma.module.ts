import { Module } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider.js';

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}

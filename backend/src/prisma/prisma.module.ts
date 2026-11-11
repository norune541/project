import { Module, Global } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider.js';

@Global()
@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './_common/services';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

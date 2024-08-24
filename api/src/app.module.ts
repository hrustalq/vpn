import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { cacheConfig } from './_common/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './_common/services/prisma.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    CacheModule.register(cacheConfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}

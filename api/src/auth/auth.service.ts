import { Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { PrismaService } from 'src/_common/services/prisma.service';
import { Account } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './entities/jwt.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  async validateUser(dto: LoginDto): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!user?.password) return false;

    const passwordsMatch = await compare(dto.password, user.password);
    if (!passwordsMatch) return false;
    return true;
  }

  validateRefreshToken(token: string) {
    return this.jwtService.verify<JwtPayload>(token);
  }

  async validateToken(token: string): Promise<boolean> {
    const exists = await this.cacheManager.get(token);
    return !!exists;
  }

  async linkOAuthAccount(
    userId: string,
    provider: string,
    profile: {
      id: string;
      accessToken?: string;
      refreshToken?: string;
      expiresAt?: number;
    },
  ): Promise<Account | null> {
    // Check if an account with the same provider and providerAccountId already exists
    const existingAccount = await this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: profile.id,
        },
      },
    });

    if (existingAccount) return null;

    // Create a new account entry for the user
    const newAccount = await this.prismaService.account.create({
      data: {
        provider,
        providerAccountId: profile.id,
        access_token: profile.accessToken,
        refresh_token: profile.refreshToken,
        expires_at: profile.expiresAt,
        type: 'sso',
        user: {
          connect: { id: userId },
        },
      },
    });

    return newAccount;
  }

  async login({ provider, login }: { provider: string; login: string }) {
    const payload: Partial<JwtPayload> = {
      iss: provider,
      sub: login,
      jti: uuidv4(),
    };
    const at = this.jwtService.sign(payload);
    const rt = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async logout(token: string) {
    const decodedToken = this.jwtService.decode(token) as JwtPayload;
    await this.cacheManager.set(decodedToken.jti, true, {
      ttl: 24 * 100 * 30 * 36,
    });
    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/_common/services/prisma.service';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const { password, ...data } = dto;
    const hashedPassword = await hash(password, 10);
    return this.prisma.user.create({
      data: { password: hashedPassword, ...data },
    });
  }
}

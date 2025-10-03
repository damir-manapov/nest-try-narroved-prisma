import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaUserService } from '../../prisma/prisma-user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaUserService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        isActive: createUserDto.isActive ?? true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(updateUserDto.email && { email: updateUserDto.email }),
        ...(updateUserDto.name && { name: updateUserDto.name }),
        ...(updateUserDto.isActive !== undefined && { isActive: updateUserDto.isActive }),
      },
    });
  }

  async softDelete(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async hardDelete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  }

  async count(): Promise<number> {
        return this.prisma.user.count({
      where: {
        isActive: true,
      },
    });
  }
}
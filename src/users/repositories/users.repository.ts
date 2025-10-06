import { Injectable } from '@nestjs/common';
import { PrismaUserService } from '../externalServices/prisma-user.service';
import { User, CreateUserData, UpdateUserData } from '../models/user.model';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaUserService) {}

  async create(createUserData: CreateUserData): Promise<User> {
    const prismaData = UserMapper.toPrismaCreateData(createUserData);
    const prismaUser = await this.prisma.user.create({
      data: prismaData,
    });
    return UserMapper.toDomain(prismaUser);
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return prismaUsers.map(UserMapper.toDomain);
  }

  async findById(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async update(id: number, updateUserData: UpdateUserData): Promise<User> {
    const prismaData = UserMapper.toPrismaUpdateData(updateUserData);
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: prismaData,
    });
    return UserMapper.toDomain(prismaUser);
  }

  async softDelete(id: number): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return UserMapper.toDomain(prismaUser);
  }

  async hardDelete(id: number): Promise<User> {
    const prismaUser = await this.prisma.user.delete({
      where: { id },
    });
    return UserMapper.toDomain(prismaUser);
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
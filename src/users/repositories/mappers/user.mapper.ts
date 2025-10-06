import { User as PrismaUser, Prisma } from '@prisma/client';
import { User, CreateUserData, UpdateUserData } from '../../models/user.model';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      isActive: prismaUser.isActive,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }

  static toPrismaCreateData(createData: CreateUserData): Prisma.UserCreateInput {
    return {
      email: createData.email,
      name: createData.name,
      isActive: createData.isActive ?? true,
    };
  }

  static toPrismaUpdateData(updateData: UpdateUserData): Prisma.UserUpdateInput {
    const data: Prisma.UserUpdateInput = {};
    
    if (updateData.email !== undefined) {
      data.email = updateData.email;
    }
    if (updateData.name !== undefined) {
      data.name = updateData.name;
    }
    if (updateData.isActive !== undefined) {
      data.isActive = updateData.isActive;
    }
    
    return data;
  }
}

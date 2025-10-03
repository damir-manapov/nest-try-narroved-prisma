import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Narrow interface that only exposes User operations
interface UserPrismaClient {
  user: PrismaClient['user'];
}

@Injectable()
export class PrismaUserService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  // Only expose User-related operations
  get users() {
    return this.prisma.user;
  }

  // Transaction with restricted interface - only User operations allowed
  async $transaction<R>(
    fn: (prisma: UserPrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction((prisma) => {
      // Create a proxy that only exposes the user entity
      const userOnlyClient = {
        user: prisma.user,
      };
      return fn(userOnlyClient);
    });
  }
}

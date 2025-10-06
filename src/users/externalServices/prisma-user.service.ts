import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Narrow interface that only exposes User and UserSettings operations
interface UserPrismaClient {
  user: PrismaClient['user'];
  userSettings: PrismaClient['userSettings'];
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

  // Only expose User and UserSettings-related operations
  get user() {
    return this.prisma.user;
  }

  get userSettings() {
    return this.prisma.userSettings;
  }

  // Transaction with restricted interface - only User and UserSettings operations allowed
  async $transaction<R>(
    fn: (prisma: UserPrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction((prisma) => {
      // Create a proxy that only exposes the user and userSettings entities
      const userOnlyClient = {
        user: prisma.user,
        userSettings: prisma.userSettings,
      };
      return fn(userOnlyClient);
    });
  }
}

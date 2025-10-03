import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Narrow interface that only exposes Partner operations
interface PartnerPrismaClient {
  partner: PrismaClient['partner'];
}

@Injectable()
export class PrismaPartnerService implements OnModuleInit, OnModuleDestroy {
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

  // Only expose Partner-related operations
  get partners() {
    return this.prisma.partner;
  }

  // Transaction with restricted interface - only Partner operations allowed
  async $transaction<R>(
    fn: (prisma: PartnerPrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction((prisma) => {
      // Create a proxy that only exposes the partner entity
      const partnerOnlyClient = {
        partner: prisma.partner,
      };
      return fn(partnerOnlyClient);
    });
  }
}

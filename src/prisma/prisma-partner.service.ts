import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Narrow interface that only exposes Partner and Contract operations
interface PartnerPrismaClient {
  partner: PrismaClient['partner'];
  contract: PrismaClient['contract'];
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

  // Only expose Partner and Contract-related operations
  get partner() {
    return this.prisma.partner;
  }

  get contract() {
    return this.prisma.contract;
  }

  // Transaction with restricted interface - only Partner and Contract operations allowed
  async $transaction<R>(
    fn: (prisma: PartnerPrismaClient) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction((prisma) => {
      // Create a proxy that only exposes the partner and contract entities
      const partnerOnlyClient = {
        partner: prisma.partner,
        contract: prisma.contract,
      };
      return fn(partnerOnlyClient);
    });
  }
}

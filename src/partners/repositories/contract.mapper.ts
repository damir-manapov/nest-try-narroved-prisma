import { Contract as PrismaContract, Prisma } from '@prisma/client';
import { Contract, CreateContractData, UpdateContractData } from '../models/contract.model';

export class ContractMapper {
  static toDomain(prismaContract: PrismaContract): Contract {
    return {
      id: prismaContract.id,
      partnerId: prismaContract.partnerId,
      title: prismaContract.title,
      description: prismaContract.description,
      amount: prismaContract.amount ? Number(prismaContract.amount) : undefined,
      currency: prismaContract.currency,
      startDate: prismaContract.startDate,
      endDate: prismaContract.endDate,
      status: prismaContract.status as 'active' | 'expired' | 'cancelled',
      isActive: prismaContract.isActive,
      createdAt: prismaContract.createdAt,
      updatedAt: prismaContract.updatedAt,
    };
  }

  static toPrismaCreateData(createData: CreateContractData): Prisma.ContractCreateInput {
    return {
      partner: {
        connect: { id: createData.partnerId }
      },
      title: createData.title,
      description: createData.description,
      amount: createData.amount,
      currency: createData.currency ?? 'USD',
      startDate: createData.startDate,
      endDate: createData.endDate,
      status: createData.status ?? 'active',
      isActive: createData.isActive ?? true,
    };
  }

  static toPrismaUpdateData(updateData: UpdateContractData): Prisma.ContractUpdateInput {
    const data: Prisma.ContractUpdateInput = {};

    if (updateData.title !== undefined) {
      data.title = updateData.title;
    }
    if (updateData.description !== undefined) {
      data.description = updateData.description;
    }
    if (updateData.amount !== undefined) {
      data.amount = updateData.amount;
    }
    if (updateData.currency !== undefined) {
      data.currency = updateData.currency;
    }
    if (updateData.startDate !== undefined) {
      data.startDate = updateData.startDate;
    }
    if (updateData.endDate !== undefined) {
      data.endDate = updateData.endDate;
    }
    if (updateData.status !== undefined) {
      data.status = updateData.status;
    }
    if (updateData.isActive !== undefined) {
      data.isActive = updateData.isActive;
    }

    return data;
  }
}

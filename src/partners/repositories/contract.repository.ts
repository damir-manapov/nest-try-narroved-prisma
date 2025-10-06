import { Injectable } from '@nestjs/common';
import { PrismaPartnerService } from '../../prisma/prisma-partner.service';
import { Contract, CreateContractData, UpdateContractData } from '../models/contract.model';
import { ContractMapper } from './contract.mapper';

@Injectable()
export class ContractRepository {
  constructor(private readonly prisma: PrismaPartnerService) {}

  async create(createContractData: CreateContractData): Promise<Contract> {
    const prismaData = ContractMapper.toPrismaCreateData(createContractData);
    const prismaContract = await this.prisma.contract.create({ data: prismaData });
    return ContractMapper.toDomain(prismaContract);
  }

  async findById(id: number): Promise<Contract | null> {
    const prismaContract = await this.prisma.contract.findUnique({
      where: { id },
    });
    return prismaContract ? ContractMapper.toDomain(prismaContract) : null;
  }

  async findByPartnerId(partnerId: number): Promise<Contract[]> {
    const prismaContracts = await this.prisma.contract.findMany({
      where: { partnerId },
    });
    return prismaContracts.map(ContractMapper.toDomain);
  }

  async update(id: number, updateContractData: UpdateContractData): Promise<Contract> {
    const prismaData = ContractMapper.toPrismaUpdateData(updateContractData);
    const prismaContract = await this.prisma.contract.update({
      where: { id },
      data: prismaData,
    });
    return ContractMapper.toDomain(prismaContract);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.contract.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Contract[]> {
    const prismaContracts = await this.prisma.contract.findMany();
    return prismaContracts.map(ContractMapper.toDomain);
  }

  async findByStatus(status: 'active' | 'expired' | 'cancelled'): Promise<Contract[]> {
    const prismaContracts = await this.prisma.contract.findMany({
      where: { status },
    });
    return prismaContracts.map(ContractMapper.toDomain);
  }

  async count(): Promise<number> {
    return this.prisma.contract.count();
  }
}

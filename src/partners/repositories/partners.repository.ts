import { Injectable } from '@nestjs/common';
import { PrismaPartnerService } from '../externalServices/prisma-partner.service';
import { Partner, CreatePartnerData, UpdatePartnerData } from '../models/partner.model';
import { PartnerMapper } from './partner.mapper';

@Injectable()
export class PartnersRepository {
  constructor(private prisma: PrismaPartnerService) {}

  async create(createPartnerData: CreatePartnerData): Promise<Partner> {
    const prismaData = PartnerMapper.toPrismaCreateData(createPartnerData);
    const prismaPartner = await this.prisma.partner.create({
      data: prismaData,
    });
    return PartnerMapper.toDomain(prismaPartner);
  }

  async findAll(): Promise<Partner[]> {
    const prismaPartners = await this.prisma.partner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return prismaPartners.map(PartnerMapper.toDomain);
  }

  async findById(id: number): Promise<Partner | null> {
    const prismaPartner = await this.prisma.partner.findUnique({
      where: { id },
    });
    return prismaPartner ? PartnerMapper.toDomain(prismaPartner) : null;
  }

  async findByEmail(email: string): Promise<Partner | null> {
    const prismaPartner = await this.prisma.partner.findUnique({
      where: { email },
    });
    return prismaPartner ? PartnerMapper.toDomain(prismaPartner) : null;
  }

  async update(id: number, updatePartnerData: UpdatePartnerData): Promise<Partner> {
    const prismaData = PartnerMapper.toPrismaUpdateData(updatePartnerData);
    const prismaPartner = await this.prisma.partner.update({
      where: { id },
      data: prismaData,
    });
    return PartnerMapper.toDomain(prismaPartner);
  }

  async softDelete(id: number): Promise<Partner> {
    const prismaPartner = await this.prisma.partner.update({
      where: { id },
      data: { isActive: false },
    });
    return PartnerMapper.toDomain(prismaPartner);
  }

  async hardDelete(id: number): Promise<Partner> {
    const prismaPartner = await this.prisma.partner.delete({
      where: { id },
    });
    return PartnerMapper.toDomain(prismaPartner);
  }

  async exists(id: number): Promise<boolean> {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!partner;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const partner = await this.prisma.partner.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!partner;
  }

  async count(): Promise<number> {
    return this.prisma.partner.count({
      where: {
        isActive: true,
      },
    });
  }
}
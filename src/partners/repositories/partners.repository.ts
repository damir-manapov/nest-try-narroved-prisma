import { Injectable } from '@nestjs/common';
import { Partner } from '@prisma/client';
import { PrismaPartnerService } from '../../prisma/prisma-partner.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';

@Injectable()
export class PartnersRepository {
  constructor(private prisma: PrismaPartnerService) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    return this.prisma.partners.create({
      data: {
        name: createPartnerDto.name,
        email: createPartnerDto.email,
        phone: createPartnerDto.phone,
        website: createPartnerDto.website,
        address: createPartnerDto.address,
        isActive: createPartnerDto.isActive ?? true,
      },
    });
  }

  async findAll(): Promise<Partner[]> {
    return this.prisma.partners.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<Partner | null> {
    return this.prisma.partners.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Partner | null> {
    return this.prisma.partners.findUnique({
      where: { email },
    });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    return this.prisma.partners.update({
      where: { id },
      data: {
        ...(updatePartnerDto.name && { name: updatePartnerDto.name }),
        ...(updatePartnerDto.email && { email: updatePartnerDto.email }),
        ...(updatePartnerDto.phone !== undefined && { phone: updatePartnerDto.phone }),
        ...(updatePartnerDto.website !== undefined && { website: updatePartnerDto.website }),
        ...(updatePartnerDto.address !== undefined && { address: updatePartnerDto.address }),
        ...(updatePartnerDto.isActive !== undefined && { isActive: updatePartnerDto.isActive }),
      },
    });
  }

  async softDelete(id: number): Promise<Partner> {
    return this.prisma.partners.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async hardDelete(id: number): Promise<Partner> {
    return this.prisma.partners.delete({
      where: { id },
    });
  }

  async exists(id: number): Promise<boolean> {
    const partner = await this.prisma.partners.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!partner;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const partner = await this.prisma.partners.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!partner;
  }

  async count(): Promise<number> {
    return this.prisma.partners.count({
      where: {
        isActive: true,
      },
    });
  }
}
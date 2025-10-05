import { Partner as PrismaPartner, Prisma } from '@prisma/client';
import { Partner, CreatePartnerData, UpdatePartnerData } from '../models/partner.model';

export class PartnerMapper {
  static toDomain(prismaPartner: PrismaPartner): Partner {
    return {
      id: prismaPartner.id,
      name: prismaPartner.name,
      email: prismaPartner.email,
      phone: prismaPartner.phone,
      website: prismaPartner.website,
      address: prismaPartner.address,
      isActive: prismaPartner.isActive,
      createdAt: prismaPartner.createdAt,
      updatedAt: prismaPartner.updatedAt,
    };
  }

  static toPrismaCreateData(createData: CreatePartnerData): Prisma.PartnerCreateInput {
    return {
      name: createData.name,
      email: createData.email,
      phone: createData.phone,
      website: createData.website,
      address: createData.address,
      isActive: createData.isActive ?? true,
    };
  }

  static toPrismaUpdateData(updateData: UpdatePartnerData): Prisma.PartnerUpdateInput {
    const data: Prisma.PartnerUpdateInput = {};
    
    if (updateData.name !== undefined) {
      data.name = updateData.name;
    }
    if (updateData.email !== undefined) {
      data.email = updateData.email;
    }
    if (updateData.phone !== undefined) {
      data.phone = updateData.phone;
    }
    if (updateData.website !== undefined) {
      data.website = updateData.website;
    }
    if (updateData.address !== undefined) {
      data.address = updateData.address;
    }
    if (updateData.isActive !== undefined) {
      data.isActive = updateData.isActive;
    }
    
    return data;
  }
}

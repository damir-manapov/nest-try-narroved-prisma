import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Partner } from '@prisma/client';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnersRepository } from './repositories/partners.repository';

@Injectable()
export class PartnersService {
  constructor(private partnersRepository: PartnersRepository) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    // Check if email already exists
    const existingPartner = await this.partnersRepository.findByEmail(createPartnerDto.email);
    if (existingPartner) {
      throw new ConflictException('Partner with this email already exists');
    }

    return this.partnersRepository.create(createPartnerDto);
  }

  async findAll(): Promise<Partner[]> {
    return this.partnersRepository.findAll();
  }

  async findOne(id: number): Promise<Partner> {
    const partner = await this.partnersRepository.findById(id);

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    return partner;
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    // Check if partner exists
    const existingPartner = await this.partnersRepository.findById(id);
    if (!existingPartner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    // Check if email is being updated and already exists
    if (updatePartnerDto.email && updatePartnerDto.email !== existingPartner.email) {
      const emailExists = await this.partnersRepository.existsByEmail(updatePartnerDto.email);
      if (emailExists) {
        throw new ConflictException('Partner with this email already exists');
      }
    }

    return this.partnersRepository.update(id, updatePartnerDto);
  }

  async remove(id: number): Promise<Partner> {
    // Check if partner exists
    const existingPartner = await this.partnersRepository.findById(id);
    if (!existingPartner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    // Soft delete
    return this.partnersRepository.softDelete(id);
  }

  async findByEmail(email: string): Promise<Partner | null> {
    return this.partnersRepository.findByEmail(email);
  }

  async getPartnerStats(): Promise<{ totalPartners: number }> {
    const totalPartners = await this.partnersRepository.count();
    return { totalPartners };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ContractRepository } from '../repositories/contract.repository';
import { Contract, CreateContractData, UpdateContractData } from '../models/contract.model';
import { CreateContractDto, UpdateContractDto } from '../dto';
import { ContractServiceMapper } from './mappers/contract-service.mapper';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepository) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const createContractData = ContractServiceMapper.toCreateContractData(createContractDto);
    return this.contractRepository.create(createContractData);
  }

  async findById(id: number): Promise<Contract | null> {
    return this.contractRepository.findById(id);
  }

  async findByPartnerId(partnerId: number): Promise<Contract[]> {
    return this.contractRepository.findByPartnerId(partnerId);
  }

  async update(id: number, updateContractDto: UpdateContractDto): Promise<Contract> {
    const existingContract = await this.contractRepository.findById(id);
    if (!existingContract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    const updateContractData = ContractServiceMapper.toUpdateContractData(updateContractDto);
    return this.contractRepository.update(id, updateContractData);
  }

  async delete(id: number): Promise<void> {
    const existingContract = await this.contractRepository.findById(id);
    if (!existingContract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return this.contractRepository.delete(id);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.findAll();
  }

  async findByStatus(status: 'active' | 'expired' | 'cancelled'): Promise<Contract[]> {
    return this.contractRepository.findByStatus(status);
  }

  async getContractStats(): Promise<{ totalContracts: number }> {
    const totalContracts = await this.contractRepository.count();
    return { totalContracts };
  }
}

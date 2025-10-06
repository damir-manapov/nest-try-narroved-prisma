import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ContractService } from '../services/contract.service';
import { Contract } from '../models/contract.model';
import { CreateContractDto, UpdateContractDto } from '../dto';

@ApiTags('Contracts')
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'Contract created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractService.create(createContractDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get contract statistics' })
  @ApiResponse({
    status: 200,
    description: 'Contract statistics retrieved successfully.',
  })
  async getContractStats() {
    return this.contractService.getContractStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 200, description: 'Contract found' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Contract | null> {
    return this.contractService.findById(id);
  }

  @Get('partner/:partnerId')
  @ApiOperation({ summary: 'Get contracts by partner ID' })
  @ApiParam({ name: 'partnerId', description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'Contracts found' })
  async findByPartnerId(@Param('partnerId', ParseIntPipe) partnerId: number): Promise<Contract[]> {
    return this.contractService.findByPartnerId(partnerId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get contracts by status' })
  @ApiParam({ name: 'status', description: 'Contract status', enum: ['active', 'expired', 'cancelled'] })
  @ApiResponse({ status: 200, description: 'Contracts found' })
  async findByStatus(
    @Param('status') status: 'active' | 'expired' | 'cancelled',
  ): Promise<Contract[]> {
    return this.contractService.findByStatus(status);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 200, description: 'Contract updated successfully' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 204, description: 'Contract deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contractService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contracts' })
  @ApiResponse({ status: 200, description: 'List of all contracts' })
  async findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }
}

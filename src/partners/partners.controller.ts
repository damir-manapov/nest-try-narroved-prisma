import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new partner' })
  @ApiResponse({ status: 201, description: 'Partner created successfully.' })
  @ApiBody({ type: CreatePartnerDto })
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active partners' })
  @ApiResponse({ status: 200, description: 'Partners retrieved successfully.' })
  async findAll() {
    return this.partnersService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get partner statistics' })
  @ApiResponse({
    status: 200,
    description: 'Partner statistics retrieved successfully.',
  })
  async getPartnerStats() {
    return this.partnersService.getPartnerStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a partner by ID' })
  @ApiResponse({ status: 200, description: 'Partner found.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Partner ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a partner' })
  @ApiResponse({ status: 200, description: 'Partner updated successfully.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Partner ID' })
  @ApiBody({ type: UpdatePartnerDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a partner (soft delete)' })
  @ApiResponse({ status: 200, description: 'Partner deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  @ApiParam({ name: 'id', type: 'number', description: 'Partner ID' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.partnersService.remove(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a partner by email' })
  @ApiResponse({ status: 200, description: 'Partner found.' })
  @ApiResponse({ status: 404, description: 'Partner not found.' })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'Partner email address',
  })
  async findByEmail(@Param('email') email: string) {
    return this.partnersService.findByEmail(email);
  }
}

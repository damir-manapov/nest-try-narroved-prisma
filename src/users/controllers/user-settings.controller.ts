import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserSettingsService } from '../services/user-settings.service';
import { UserSettings } from '../models/user-settings.model';
import { CreateUserSettingsDto, UpdateUserSettingsDto } from '../dto';

@ApiTags('User Settings')
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create user settings' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 201, description: 'User settings created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserSettingsDto: CreateUserSettingsDto,
  ): Promise<UserSettings> {
    return this.userSettingsService.create(userId, createUserSettingsDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user settings by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User settings found' })
  @ApiResponse({ status: 404, description: 'User settings not found' })
  async findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<UserSettings | null> {
    return this.userSettingsService.findByUserId(userId);
  }

  @Put('user/:userId')
  @ApiOperation({ summary: 'Update user settings by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User settings updated successfully' })
  @ApiResponse({ status: 404, description: 'User settings not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettings> {
    return this.userSettingsService.update(userId, updateUserSettingsDto);
  }

  @Delete('user/:userId')
  @ApiOperation({ summary: 'Delete user settings by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User settings deleted successfully' })
  @ApiResponse({ status: 404, description: 'User settings not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this.userSettingsService.delete(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user settings' })
  @ApiResponse({ status: 200, description: 'List of all user settings' })
  async findAll(): Promise<UserSettings[]> {
    return this.userSettingsService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user settings statistics' })
  @ApiResponse({
    status: 200,
    description: 'User settings statistics retrieved successfully.',
  })
  async getUserSettingsStats() {
    return this.userSettingsService.getUserSettingsStats();
  }
}

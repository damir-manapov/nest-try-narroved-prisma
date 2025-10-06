import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSettingsRepository } from '../repositories/user-settings.repository';
import { UserSettings, CreateUserSettingsData, UpdateUserSettingsData } from '../models/user-settings.model';
import { CreateUserSettingsDto, UpdateUserSettingsDto } from '../dto';
import { UserSettingsServiceMapper } from './mappers/user-settings-service.mapper';

@Injectable()
export class UserSettingsService {
  constructor(private readonly userSettingsRepository: UserSettingsRepository) {}

  async create(userId: number, createUserSettingsDto: CreateUserSettingsDto): Promise<UserSettings> {
    const createUserSettingsData = UserSettingsServiceMapper.toCreateUserSettingsData(
      userId,
      createUserSettingsDto,
    );
    return this.userSettingsRepository.create(createUserSettingsData);
  }

  async findByUserId(userId: number): Promise<UserSettings | null> {
    return this.userSettingsRepository.findByUserId(userId);
  }

  async update(userId: number, updateUserSettingsDto: UpdateUserSettingsDto): Promise<UserSettings> {
    const existingSettings = await this.userSettingsRepository.findByUserId(userId);
    if (!existingSettings) {
      throw new NotFoundException(`User settings not found for user ID ${userId}`);
    }

    const updateUserSettingsData = UserSettingsServiceMapper.toUpdateUserSettingsData(
      updateUserSettingsDto,
    );
    return this.userSettingsRepository.update(userId, updateUserSettingsData);
  }

  async delete(userId: number): Promise<void> {
    const existingSettings = await this.userSettingsRepository.findByUserId(userId);
    if (!existingSettings) {
      throw new NotFoundException(`User settings not found for user ID ${userId}`);
    }
    return this.userSettingsRepository.delete(userId);
  }

  async findAll(): Promise<UserSettings[]> {
    return this.userSettingsRepository.findAll();
  }

  async getUserSettingsStats(): Promise<{ totalUserSettings: number }> {
    const totalUserSettings = await this.userSettingsRepository.count();
    return { totalUserSettings };
  }
}

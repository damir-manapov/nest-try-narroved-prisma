import { Injectable } from '@nestjs/common';
import { PrismaUserService } from '../externalServices/prisma-user.service';
import { UserSettings, CreateUserSettingsData, UpdateUserSettingsData } from '../models/user-settings.model';
import { UserSettingsMapper } from './mappers/user-settings.mapper';

@Injectable()
export class UserSettingsRepository {
  constructor(private readonly prisma: PrismaUserService) {}

  async create(createUserSettingsData: CreateUserSettingsData): Promise<UserSettings> {
    const prismaData = UserSettingsMapper.toPrismaCreateData(createUserSettingsData);
    const prismaUserSettings = await this.prisma.userSettings.create({ data: prismaData });
    return UserSettingsMapper.toDomain(prismaUserSettings);
  }

  async findByUserId(userId: number): Promise<UserSettings | null> {
    const prismaUserSettings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });
    return prismaUserSettings ? UserSettingsMapper.toDomain(prismaUserSettings) : null;
  }

  async update(userId: number, updateUserSettingsData: UpdateUserSettingsData): Promise<UserSettings> {
    const prismaData = UserSettingsMapper.toPrismaUpdateData(updateUserSettingsData);
    const prismaUserSettings = await this.prisma.userSettings.update({
      where: { userId },
      data: prismaData,
    });
    return UserSettingsMapper.toDomain(prismaUserSettings);
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.userSettings.delete({
      where: { userId },
    });
  }

  async findAll(): Promise<UserSettings[]> {
    const prismaUserSettings = await this.prisma.userSettings.findMany();
    return prismaUserSettings.map(UserSettingsMapper.toDomain);
  }

  async count(): Promise<number> {
    return this.prisma.userSettings.count();
  }
}

import { UserSettings as PrismaUserSettings, Prisma } from '@prisma/client';
import { UserSettings, CreateUserSettingsData, UpdateUserSettingsData } from '../models/user-settings.model';

export class UserSettingsMapper {
  static toDomain(prismaUserSettings: PrismaUserSettings): UserSettings {
    return {
      id: prismaUserSettings.id,
      userId: prismaUserSettings.userId,
      theme: prismaUserSettings.theme as 'light' | 'dark' | 'auto',
      language: prismaUserSettings.language,
      timezone: prismaUserSettings.timezone,
      notifications: prismaUserSettings.notifications,
      emailNotifications: prismaUserSettings.emailNotifications,
      createdAt: prismaUserSettings.createdAt,
      updatedAt: prismaUserSettings.updatedAt,
    };
  }

  static toPrismaCreateData(createData: CreateUserSettingsData): Prisma.UserSettingsCreateInput {
    return {
      user: {
        connect: { id: createData.userId }
      },
      theme: createData.theme ?? 'light',
      language: createData.language ?? 'en',
      timezone: createData.timezone ?? 'UTC',
      notifications: createData.notifications ?? true,
      emailNotifications: createData.emailNotifications ?? true,
    };
  }

  static toPrismaUpdateData(updateData: UpdateUserSettingsData): Prisma.UserSettingsUpdateInput {
    const data: Prisma.UserSettingsUpdateInput = {};

    if (updateData.theme !== undefined) {
      data.theme = updateData.theme;
    }
    if (updateData.language !== undefined) {
      data.language = updateData.language;
    }
    if (updateData.timezone !== undefined) {
      data.timezone = updateData.timezone;
    }
    if (updateData.notifications !== undefined) {
      data.notifications = updateData.notifications;
    }
    if (updateData.emailNotifications !== undefined) {
      data.emailNotifications = updateData.emailNotifications;
    }

    return data;
  }
}

import { CreateUserSettingsDto } from '../../dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from '../../dto/update-user-settings.dto';
import { CreateUserSettingsData, UpdateUserSettingsData } from '../../models/user-settings.model';

export class UserSettingsServiceMapper {
  static toCreateUserSettingsData(
    userId: number,
    createUserSettingsDto: CreateUserSettingsDto,
  ): CreateUserSettingsData {
    return {
      userId,
      theme: createUserSettingsDto.theme,
      language: createUserSettingsDto.language,
      timezone: createUserSettingsDto.timezone,
      notifications: createUserSettingsDto.notifications,
      emailNotifications: createUserSettingsDto.emailNotifications,
    };
  }

  static toUpdateUserSettingsData(
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): UpdateUserSettingsData {
    return {
      theme: updateUserSettingsDto.theme,
      language: updateUserSettingsDto.language,
      timezone: updateUserSettingsDto.timezone,
      notifications: updateUserSettingsDto.notifications,
      emailNotifications: updateUserSettingsDto.emailNotifications,
    };
  }
}

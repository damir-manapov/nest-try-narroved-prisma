import { IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';

export class CreateUserSettingsDto {
  @IsString()
  theme?: 'light' | 'dark' | 'auto';

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsBoolean()
  notifications?: boolean;

  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;
}

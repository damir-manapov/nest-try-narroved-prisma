import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaUserService } from './externalServices/prisma-user.service';
import { UsersRepository } from './repositories/users.repository';
import { UserSettingsRepository } from './repositories/user-settings.repository';
import { UserSettingsService } from './services/user-settings.service';
import { UserSettingsController } from './controllers/user-settings.controller';

@Module({
  controllers: [UsersController, UserSettingsController],
  providers: [
    UsersService,
    UserSettingsService,
    PrismaUserService,
    UsersRepository,
    UserSettingsRepository,
  ],
  exports: [UsersService, UserSettingsService],
})
export class UsersModule {}

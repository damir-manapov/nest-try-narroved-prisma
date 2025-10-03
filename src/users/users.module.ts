import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaUserService } from '../prisma/prisma-user.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaUserService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}

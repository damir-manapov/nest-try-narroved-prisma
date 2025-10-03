import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PartnersRepository } from './repositories/partners.repository';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, PrismaService, PartnersRepository],
  exports: [PartnersService],
})
export class PartnersModule {}

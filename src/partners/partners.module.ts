import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaPartnerService } from '../prisma/prisma-partner.service';
import { PartnersRepository } from './repositories/partners.repository';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, PrismaPartnerService, PartnersRepository],
  exports: [PartnersService],
})
export class PartnersModule {}

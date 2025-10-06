import { Module } from '@nestjs/common';
import { PartnersService } from './services/partners.service';
import { PartnersController } from './controllers/partners.controller';
import { PrismaPartnerService } from './externalServices/prisma-partner.service';
import { PartnersRepository } from './repositories/partners.repository';
import { ContractRepository } from './repositories/contract.repository';
import { ContractService } from './services/contract.service';
import { ContractController } from './controllers/contract.controller';

@Module({
  controllers: [PartnersController, ContractController],
  providers: [
    PartnersService,
    ContractService,
    PrismaPartnerService,
    PartnersRepository,
    ContractRepository,
  ],
  exports: [PartnersService, ContractService],
})
export class PartnersModule {}

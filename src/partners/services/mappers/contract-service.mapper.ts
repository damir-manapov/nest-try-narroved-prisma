import { CreateContractDto } from '../../dto/create-contract.dto';
import { UpdateContractDto } from '../../dto/update-contract.dto';
import { CreateContractData, UpdateContractData } from '../../models/contract.model';

export class ContractServiceMapper {
  static toCreateContractData(createContractDto: CreateContractDto): CreateContractData {
    return {
      partnerId: createContractDto.partnerId,
      title: createContractDto.title,
      description: createContractDto.description,
      amount: createContractDto.amount,
      currency: createContractDto.currency,
      startDate: new Date(createContractDto.startDate),
      endDate: createContractDto.endDate ? new Date(createContractDto.endDate) : undefined,
      status: createContractDto.status,
      isActive: createContractDto.isActive,
    };
  }

  static toUpdateContractData(updateContractDto: UpdateContractDto): UpdateContractData {
    return {
      title: updateContractDto.title,
      description: updateContractDto.description,
      amount: updateContractDto.amount,
      currency: updateContractDto.currency,
      startDate: updateContractDto.startDate ? new Date(updateContractDto.startDate) : undefined,
      endDate: updateContractDto.endDate ? new Date(updateContractDto.endDate) : undefined,
      status: updateContractDto.status,
      isActive: updateContractDto.isActive,
    };
  }
}

import { CreatePartnerDto } from '../../dto/create-partner.dto';
import { UpdatePartnerDto } from '../../dto/update-partner.dto';
import { CreatePartnerData, UpdatePartnerData } from '../../models/partner.model';

export class PartnerServiceMapper {
  static toCreatePartnerData(createPartnerDto: CreatePartnerDto): CreatePartnerData {
    return {
      name: createPartnerDto.name,
      email: createPartnerDto.email,
      phone: createPartnerDto.phone,
      website: createPartnerDto.website,
      address: createPartnerDto.address,
      isActive: createPartnerDto.isActive,
    };
  }

  static toUpdatePartnerData(updatePartnerDto: UpdatePartnerDto): UpdatePartnerData {
    return {
      name: updatePartnerDto.name,
      email: updatePartnerDto.email,
      phone: updatePartnerDto.phone,
      website: updatePartnerDto.website,
      address: updatePartnerDto.address,
      isActive: updatePartnerDto.isActive,
    };
  }
}

import { IsString, IsOptional, IsNumber, IsDateString, IsIn, IsBoolean, Min } from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  partnerId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['active', 'expired', 'cancelled'])
  status?: 'active' | 'expired' | 'cancelled';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

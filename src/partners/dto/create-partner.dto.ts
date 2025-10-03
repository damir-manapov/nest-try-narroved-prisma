import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'Partner name',
    example: 'Acme Corporation',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Partner email address',
    example: 'contact@acme.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Partner phone number',
    example: '+1-555-123-4567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Partner website URL',
    example: 'https://acme.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'Partner address',
    example: '123 Business St, Suite 100, City, ST 12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Whether the partner is active',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export interface Partner {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePartnerData {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  isActive?: boolean;
}

export interface UpdatePartnerData {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  isActive?: boolean;
}

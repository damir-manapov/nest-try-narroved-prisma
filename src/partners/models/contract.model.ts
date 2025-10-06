export interface Contract {
  id: number;
  partnerId: number;
  title: string;
  description?: string;
  amount?: number;
  currency: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'expired' | 'cancelled';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContractData {
  partnerId: number;
  title: string;
  description?: string;
  amount?: number;
  currency?: string;
  startDate: Date;
  endDate?: Date;
  status?: 'active' | 'expired' | 'cancelled';
  isActive?: boolean;
}

export interface UpdateContractData {
  title?: string;
  description?: string;
  amount?: number;
  currency?: string;
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'expired' | 'cancelled';
  isActive?: boolean;
}

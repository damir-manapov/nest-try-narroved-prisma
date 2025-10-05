export interface User {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  isActive?: boolean;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  isActive?: boolean;
}

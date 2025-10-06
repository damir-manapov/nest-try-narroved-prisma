export interface UserSettings {
  id: number;
  userId: number;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: boolean;
  emailNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserSettingsData {
  userId: number;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  timezone?: string;
  notifications?: boolean;
  emailNotifications?: boolean;
}

export interface UpdateUserSettingsData {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  timezone?: string;
  notifications?: boolean;
  emailNotifications?: boolean;
}

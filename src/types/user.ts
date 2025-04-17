export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  EDITOR = 'editor'
}

export interface User {
  id: number;
  username: string;
  email?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserUpdateData {
  id: number;
  username: string;
  password?: string;
  role: UserRole;
}

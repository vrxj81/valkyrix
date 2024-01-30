export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  accessToken?: string;
  loginExpires?: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
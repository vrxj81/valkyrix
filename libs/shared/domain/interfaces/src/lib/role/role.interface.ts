export interface IRole {
  id: string;
  name: string;
  description?: string;
  version: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt?: Date
}
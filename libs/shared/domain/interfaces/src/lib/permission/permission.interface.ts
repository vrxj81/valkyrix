export interface IPermission {
  id: string;
  name: string;
  description?: string;
  action: string;
  subject: string;
  conditions?: object;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
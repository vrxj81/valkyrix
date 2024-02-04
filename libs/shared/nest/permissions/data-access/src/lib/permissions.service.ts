import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IPermission } from '@valkyrix/domain-interfaces';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly permissionsRepository: Repository<Permission>
  ) {}

  findAll(options?: FindManyOptions<Permission>): Promise<Permission[]> {
    return this.permissionsRepository.find(options);
  }

  async findOne(id: string, options?: FindOneOptions<Permission>): Promise<Permission> {
    options = {...options, where:{id}};
    const permission = await this.permissionsRepository.findOne(options);
    if (!permission) {
      throw new NotFoundException(`Permission #${id} not found`);
    }
    return permission;
  }

  create(permissionData: Partial<IPermission>): Promise<Permission> {
    const permission = this.permissionsRepository.create(permissionData);
    return this.permissionsRepository.save(permission);
  }

  async update(id: string, permissionData: Partial<IPermission>): Promise<Permission> {
    const permission = await this.permissionsRepository.preload({
      id,
      ...permissionData
    });
    if (!permission) {
      throw new NotFoundException(`Permission #${id} not found`);
    }
    return this.permissionsRepository.save(permission);
  }

  async delete(id: string): Promise<Permission> {
    const permission = await this.findOne(id);
    return this.permissionsRepository.remove(permission);
  }
}

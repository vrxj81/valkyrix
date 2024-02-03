import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IRole } from '@valkyrix/domain-interfaces';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>
  ) {}

  findAll(options?: FindManyOptions<Role>): Promise<Role[]> {
    return this.rolesRepository.find(options);
  }

  async findOne(id: string, options?: FindOneOptions<Role>): Promise<Role> {
    options = {...options, where: {id}};
    const role = await this.rolesRepository.findOne(options);
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`)
    }
    return role;
  }

  async create(roleData: Partial<IRole>): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    return this.rolesRepository.save(role);
  }

  async update(id: string, roleData: Partial<IRole>): Promise<Role> {
    const role = await this.rolesRepository.preload({
      id,
      ...roleData
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`)
    }
    return this.rolesRepository.save(role);
  }

  async delete(id: string): Promise<Role> {
    const role = await this.findOne(id);
    return this.rolesRepository.remove(role);
  }
}

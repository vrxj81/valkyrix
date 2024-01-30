import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IUser } from '@valkyrix/domain-interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(id: string, options?: FindOneOptions<User>): Promise<User> {
    options = {...options, where: { id }}
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user;
  }

  async create(userData: Partial<IUser>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<IUser>): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...userData
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<User> {
    // TODO: either hard delete or soft delete depending on configuration
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  //TODO: add restore function which only works if soft delete is enabled
}

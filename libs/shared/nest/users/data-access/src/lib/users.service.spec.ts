import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { IUser } from '@valkyrix/domain-interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const id = faker.string.uuid();

  const userData: Pick<IUser, 'username' | 'email' | 'password' | 'accessToken' | 'loginExpires' | 'version' | 'createdAt' | 'updatedAt'> = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: faker.string.hexadecimal(),
    loginExpires: faker.date.soon(),
    version: faker.number.int(10),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }

  const expectedUser: IUser = {id, ...userData};

  const expectedUsers: IUser[] = [expectedUser];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedUsers),
    findOne: jest.fn().mockResolvedValue(expectedUser),
    create: jest.fn().mockResolvedValue(expectedUser),
    save: jest.fn().mockResolvedValue(expectedUser),
    preload: jest.fn().mockResolvedValue(expectedUser),
    remove: jest.fn().mockResolvedValue(expectedUser)
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService],
    }).useMocker((token) => {
      if(token === getRepositoryToken(User)) {
        return mockRepository;
      }
      return;
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(expectedUsers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await service.findOne(id);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
    it('should return a NotFoundException', async () => {
      try {
        await service.findOne(faker.string.uuid());
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
      }
    });
  });
  describe('create', () => {
    it('should create and return a user', async () => {
      const result = await service.create(userData);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update and return a user',async () => {
      const result = await service.update(id, userData);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.preload).toHaveBeenCalled();
    });
    it('should return a NotFoundException', async () => {
      try {
        await service.update(faker.string.uuid(), userData);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
      }
    });
  });
  describe('delete', () => {
    it('should delete and return a user', async () => {
      const result = await service.delete(id);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.remove).toHaveBeenCalled();
    });
  });
});

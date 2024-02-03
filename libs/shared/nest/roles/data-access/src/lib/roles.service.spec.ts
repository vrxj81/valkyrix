import { Test } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { faker } from '@faker-js/faker';
import { IRole } from '@valkyrix/domain-interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { NotFoundException } from '@nestjs/common';

describe('RolesService', () => {
  let service: RolesService;

  const id: string = faker.string.uuid();

  const roleData: Pick<IRole, 'name' | 'description'> = {
    name: faker.person.jobType(),
    description: faker.lorem.sentence()
  }

  const expectedRole: IRole = {
    id,
    ...roleData,
    version: faker.number.int(10),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  }

  const expectedRoles: IRole[] = [expectedRole];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedRoles),
    findOne: jest.fn().mockResolvedValue(expectedRole),
    create: jest.fn().mockResolvedValue(expectedRole),
    save: jest.fn().mockResolvedValue(expectedRole),
    preload: jest.fn().mockResolvedValue(expectedRole),
    remove: jest.fn().mockResolvedValue(expectedRole)
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RolesService],
    }).useMocker((token) => {
      if (token===getRepositoryToken(Role)) {
        return mockRepository;
      }
      return;
    }).compile();

    service = module.get(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  describe('findAll', () => {
    it('should return all roles', async () => {
      const result = await service.findAll();
      expect(result).toEqual(expectedRoles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a role by id', async () => {
      const result = await service.findOne(id);
      expect(result).toEqual(expectedRole);
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
    it('should throw a NotFoundException', async () => {
      try {
        await service.findOne(faker.string.uuid());
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () =>{
    it('should create and return a role', async () => {
      const result = await service.create(roleData);
      expect(result).toEqual(expectedRole);
      expect(mockRepository.create).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update and return a role', async () => {
      const result = await service.update(id, roleData);
      expect(result).toEqual(expectedRole);
      expect(mockRepository.preload).toHaveBeenCalled();
    });
    it('should throw a NotFoundException', async () => {
      try {
        await service.update(faker.string.uuid(), roleData);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should delete and return a role', async () => {
      const result = await service.delete(id);
      expect(result).toEqual(expectedRole);
      expect(mockRepository.remove).toHaveBeenCalled();
    });
    it('should throw a NotFoundException', async () => {
      try {
        await service.delete(faker.string.uuid());
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

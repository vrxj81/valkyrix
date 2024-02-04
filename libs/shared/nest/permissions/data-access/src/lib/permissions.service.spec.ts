import { Test } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { faker } from '@faker-js/faker';
import { IPermission } from '@valkyrix/domain-interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { NotFoundException } from '@nestjs/common';

describe('PermissionsService', () => {
  let service: PermissionsService;

  const id: string = faker.string.uuid();

  const permissionData: Pick<IPermission, 'name' | 'description' | 'action' | 'subject'> = {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
    action: faker.company.buzzVerb(),
    subject: faker.company.buzzPhrase()
  }

  const expectedPermission: IPermission = {
    id,
    ...permissionData,
    version: faker.number.int(10),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  }

  const expectedPermissions = [expectedPermission];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedPermissions),
    findOne: jest.fn().mockResolvedValue(expectedPermission),
    create: jest.fn().mockResolvedValue(expectedPermission),
    save: jest.fn().mockResolvedValue(expectedPermission),
    preload: jest.fn().mockResolvedValue(expectedPermission),
    remove: jest.fn().mockResolvedValue(expectedPermission),
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PermissionsService],
    }).useMocker((token) => {
      if (token===getRepositoryToken(Permission)) {
        return mockRepository;
      }
      return;
    }).compile();

    service = module.get(PermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  describe('findAll', () => {
    it('should return all permissions', async () => {
      const result = await service.findAll();
      expect(result).toEqual(expectedPermissions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a permission by id', async () => {
      const result = await service.findOne(id);
      expect(result).toEqual(expectedPermission);
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
  describe('create', () => {
    it('should create and return a Permission', async () => {
      const result = await service.create(permissionData);
      expect(result).toEqual(expectedPermission);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update and return a permission', async () => {
      const result = await service.update(id, permissionData);
      expect(result).toEqual(expectedPermission);
      expect(mockRepository.preload).toHaveBeenCalled();
    });
    it('should throw a NotFoundException', async () => {
      try {
        await service.update(faker.string.uuid(), permissionData);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should delete and return a permission', async () => {
      const result = await service.delete(id);
      expect(result).toEqual(expectedPermission);
      expect(mockRepository.remove).toHaveBeenCalled();
    });
  });
});

import { Test } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { faker } from '@faker-js/faker';
import { IRole } from '@valkyrix/domain-interfaces';
import { RolesService, Role } from '@valkyrix/nest-roles-data-access';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

  const id: string = faker.string.uuid();

  const roleData: Pick<IRole, 'name' | 'description'> = {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  };

  const expectedRole: IRole = {
    id,
    ...roleData,
    version: faker.number.int(10),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const expectedRoles: IRole[] = [expectedRole];

describe('RolesController Unit Tests', () => {
  let controller: RolesController;

  const mockService = {
    findAll: jest.fn().mockResolvedValue(expectedRoles),
    findOne: jest.fn().mockResolvedValue(expectedRole),
    create: jest.fn().mockResolvedValue(expectedRole),
    update: jest.fn().mockResolvedValue(expectedRole),
    delete: jest.fn().mockResolvedValue(expectedRole),
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{
        provide: RolesService,
        useValue: mockService,
      }],
      controllers: [RolesController],
    }).compile();

    controller = module.get(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      expect(await controller.findAll()).toEqual(expectedRoles);
    });
  });
  describe('findOne', () => {
    it('should return a role', async () => {
      expect(await controller.findOne(id)).toEqual(expectedRole);
    });
    it('should throw an error if the role does not exist', async () => {
      try {
        await controller.findOne(faker.string.uuid());
      }
      catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('create', () => {
    it('should create a role', async () => {
      expect(await controller.create(roleData)).toEqual(expectedRole);
    });
  });
  describe('update', () => {
    it('should update a role', async () => {
      expect(await controller.update(id, roleData)).toEqual(expectedRole);
    });
    it('should throw an error if the role does not exist', async () => {
      try {
        await controller.update(faker.string.uuid(), roleData);
      }
      catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('delete', () => {
    it('should delete a role', async () => {
      expect(await controller.delete(id)).toEqual(expectedRole);
    });
    it('should throw an error if the role does not exist', async () => {
      try {
        await controller.delete(faker.string.uuid());
      }
      catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe('RolesController Integration Tests', () => {
  let controller: RolesController;

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedRoles),
    findOne: jest.fn().mockResolvedValue(expectedRole),
    create: jest.fn().mockResolvedValue(expectedRole),
    save: jest.fn().mockResolvedValue(expectedRole),
    preload: jest.fn().mockResolvedValue(expectedRole),
    remove: jest.fn().mockResolvedValue(expectedRole),
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RolesService],
      controllers: [RolesController],
    }).useMocker((token) => {
      if(token === getRepositoryToken(Role)) {
        return mockRepository;
      }
      return undefined;
    }).compile();

    controller = module.get(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      expect(await controller.findAll()).toEqual(expectedRoles);
    });
  });
  describe('findOne', () => {
    it('should return a role', async () => {
      expect(await controller.findOne(id)).toEqual(expectedRole);
    });
    it('should throw a NotFoundException if the role does not exist', async () => {
      try {
        await controller.findOne(faker.string.uuid());
      }
      catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a role', async () => {
      expect(await controller.create(roleData)).toEqual(expectedRole);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      expect(await controller.update(id, roleData)).toEqual(expectedRole);
    });
    it('should throw a NotFoundException if the role does not exist', async () => {
      try {
        await controller.update(faker.string.uuid(), roleData);
      }
      catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      expect(await controller.delete(id)).toEqual(expectedRole);
    });
    it('should throw a NotFoundException if the role does not exist', async () => {
      try {
        await controller.delete(faker.string.uuid());
      }
      catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { faker } from '@faker-js/faker';
import { IUser } from '@valkyrix/domain-interfaces';
import { UsersService } from '@valkyrix/nest-users-data-access';

describe('UsersController Unit Tests', () => {
  let controller: UsersController;

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

  const mockService = {
    findAll: jest.fn().mockResolvedValue(expectedUsers),
    findOne: jest.fn().mockResolvedValue(expectedUser),
    create: jest.fn().mockResolvedValue(expectedUser),
    update: jest.fn().mockResolvedValue(expectedUser),
    delete: jest.fn().mockResolvedValue(expectedUser)
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: mockService
        }
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(expectedUsers);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a user by id',async () => {
      const result = await controller.findOne(id);
      expect(result).toEqual(expectedUser);
      expect(mockService.findOne).toHaveBeenCalled();
    });
    it('should throw an error',async () => {
      try {
        await controller.findOne(faker.string.uuid());
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
  describe('create', () => {
    it('should create and return a user', async () => {
      const result = await controller.create(userData);
      expect(result).toEqual(expectedUser);
      expect(mockService.create).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update and return a user',async () => {
      const result = await controller.update(id, userData);
      expect(result).toEqual(expectedUser);
      expect(mockService.update).toHaveBeenCalled();
    });
    it('should throw an error', async () => {
      try {
        await controller.update(faker.string.uuid(), userData);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
  describe('delete', () => {
    it('should delete and return a user',async () => {
      const result = await controller.delete(id);
      expect(result).toEqual(expectedUser);
      expect(mockService.delete).toHaveBeenCalled();
    });
    it('should throw an error', async () => {
      try {
        await controller.delete(faker.string.uuid());
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});

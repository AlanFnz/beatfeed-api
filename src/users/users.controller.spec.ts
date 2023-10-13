import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = { success: true, payload: expect.any(Array) };
      expect(await controller.getUsers()).toEqual(result);
    });
  });

  describe('getUser', () => {
    it('should return a single user', async () => {
      const result = { success: true, payload: expect.any(Object) };
      expect(await controller.getUser('1')).toEqual(result);
    });

    it('should return null if user is not found', async () => {
      const result = { success: true, payload: null };
      expect(await controller.getUser('10')).toEqual(result);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        email: 'test@test.com',
        password: 'test123',
      };
      const result = {
        success: true,
        payload: {
          username: 'test',
          email: 'test@test.com',
          password: 'test123',
        },
      };
      expect(await controller.createUser(createUserDto)).toEqual(result);
    });
  });

  describe('deleteUser', () => {
    it('should return success when deleting a user', async () => {
      const result = { success: true };
      expect(await controller.deleteUser('1')).toEqual(result);
    });
  });
});

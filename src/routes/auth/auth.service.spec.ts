import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { UsersDao } from '../../domain/users';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  const usersDaoMock = {
    findOneByEmail: jest.fn(),
  };
  const jwtServiceMock = {
    sign: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersDao, useValue: usersDaoMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
  });

  describe('validate()', () => {
    test('it should return null if the user is not found', async () => {
      usersDaoMock.findOneByEmail.mockResolvedValue(null);

      await expect(
        authService.validate('email@email.com', 'password'),
      ).resolves.toBeNull();
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledWith(
        'email@email.com',
      );
    });

    test('it should return null if the given password does not match the one in DB', async () => {
      usersDaoMock.findOneByEmail.mockResolvedValue({ passwordHash: '123' });

      await expect(
        authService.validate('email@email.com', 'password'),
      ).resolves.toBeNull();
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledWith(
        'email@email.com',
      );
    });

    test('it should return the user when password matches', async () => {
      const user = {
        id: 1,
        email: 'email@email.com',
        passwordHash: '5f4dcc3b5aa765d61d8327deb882cf99',
      };
      usersDaoMock.findOneByEmail.mockResolvedValue(user);

      await expect(
        authService.validate('email@email.com', 'password'),
      ).resolves.toBe(user);
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(usersDaoMock.findOneByEmail).toHaveBeenCalledWith(user.email);
    });
  });

  describe('login()', () => {
    test('it should return the token', () => {
      jwtServiceMock.sign.mockReturnValueOnce('token');

      expect(authService.login({ id: 1, email: 'an@email.com' })).toEqual({
        token: 'token',
      });
      expect(jwtServiceMock.sign).toBeCalledTimes(1);
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        id: 1,
        email: 'an@email.com',
      });
    });
  });
});

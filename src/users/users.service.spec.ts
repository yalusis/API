import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userService: IUserService;
let usersRepository: IUsersRepository;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await userService.createUser({
			email: 'test@gmail.com',
			name: 'Alex',
			password: '12345',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('12345');
	});

	it('Validate User - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await userService.validateUser({
			email: 'test@gmail.com',
			password: '12345',
		});
		expect(result).toBeTruthy();
	});

	it('Validate User - underfined user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await userService.validateUser({
			email: 'test@gmail.com',
			password: '12345',
		});
		expect(res).toBeFalsy();
	});

	it('Validate User - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await userService.validateUser({
			email: 'test@gmail.com',
			password: '123456',
		});
		expect(res).toBeFalsy();
	});
});

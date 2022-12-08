import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (users: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}

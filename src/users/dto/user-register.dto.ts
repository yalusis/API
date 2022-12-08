import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Невірно вказано email' })
	email: string;

	@IsString({ message: 'Невірно вказано пароль' })
	password: string;

	@IsString({ message: 'Невірно вказано name' })
	name: string;
}

import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Невірно вказано email' })
	email: string;

	@IsString({ message: 'Невірно вказано пароль' })
	password: string;
}

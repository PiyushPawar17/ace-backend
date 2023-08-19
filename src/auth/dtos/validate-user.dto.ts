import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	profilePicture: string;
}

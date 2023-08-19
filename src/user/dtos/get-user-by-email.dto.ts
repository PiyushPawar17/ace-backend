import { IsEmail } from 'class-validator';

export class GetUserByEmailDto {
	@IsEmail({ allow_display_name: true }, { message: 'Invalid email' })
	email: string;
}

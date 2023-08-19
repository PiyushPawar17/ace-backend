import { IsString, IsOptional, MinLength, MaxLength, Matches, IsUrl, ValidationArguments } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
	@IsString()
	@Transform(({ value }) => value?.trim())
	@IsOptional()
	@MinLength(1, { message: 'Name should contain atleast 1 character' })
	@MaxLength(50, { message: 'Name should not be more than 50 characters' })
	name?: string;

	@IsString()
	@Transform(({ value }) => value?.trim())
	@IsOptional()
	@MinLength(3, { message: 'Username should contain atleast 3 characters' })
	@MaxLength(20, { message: 'Username should not be more than 20 characters' })
	@Matches(/^[a-z][a-z0-9_]{2,20}$/, {
		message: (args: ValidationArguments) => {
			if (args.value[0] === '_') {
				return 'Username should start with an alphabet';
			}

			if (/[0-9]/.test(args.value[0])) {
				return 'Username should start with an alphabet';
			}

			return 'Username should only contain lowercase alphabets, numbers and underscores';
		}
	})
	username?: string;

	@IsString()
	@Transform(({ value }) => value?.trim())
	@IsOptional()
	@IsUrl({ require_protocol: true }, { message: 'Invalid URL for profile picture' })
	profilePicture?: string;
}

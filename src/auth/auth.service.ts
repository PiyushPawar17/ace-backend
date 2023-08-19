import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { ValidateUserDto } from './dtos';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {}

	async validateUser(validateUserDto: ValidateUserDto) {
		const { email, name, profilePicture } = validateUserDto;

		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			return this.userService.createUser({ email, name, profilePicture });
		}

		return user;
	}

	async findUserById(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id } });

		return user;
	}
}

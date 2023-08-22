import { Controller, Get, Req, NotFoundException, ForbiddenException } from '@nestjs/common';

import { UserService } from './user.service';

import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	async getUser(@Req() request: Request) {
		if (!request.user) {
			throw new ForbiddenException('No user logged in');
		}

		const user = await this.userService.getUserById((request.user as User).id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}
}

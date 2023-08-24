import { Controller, Get, Req, UseGuards, NotFoundException } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '../guards';

import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@UseGuards(AuthGuard)
	async getUser(@Req() request: Request) {
		const user = await this.userService.getUserById((request.user as User).id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	@Get('lists')
	@UseGuards(AuthGuard)
	async getUserLists(@Req() request: Request) {
		return this.userService.getUserLists(request.user.id);
	}
}

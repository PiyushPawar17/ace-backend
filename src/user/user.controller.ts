import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	Req,
	UseGuards,
	NotFoundException,
	ForbiddenException
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@/guards/auth.guard';

import { GetUserByEmailDto, UpdateUserDto } from './dtos';

import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(AuthGuard)
	async getUser(@Req() request: Request) {
		const user = await this.userService.getUserById((request.user as User).id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	@Post('by-email')
	async getUserByEmail(@Body() emailDto: GetUserByEmailDto) {
		const { email } = emailDto;

		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	@Patch(':userId')
	@UseGuards(AuthGuard)
	async updateUser(@Req() request: Request, @Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
		if ((request.user as User).id !== userId) {
			throw new ForbiddenException('Unauthorized to update the user');
		}

		return this.userService.updateUser(userId, updateUserDto);
	}

	@Delete(':userId')
	@UseGuards(AuthGuard)
	async deactivateUser(@Req() request: Request, @Param('userId') userId: string) {
		if ((request.user as User).id !== userId) {
			throw new ForbiddenException('Unauthorized to update the user');
		}

		return this.userService.deactivateUser(userId);
	}
}

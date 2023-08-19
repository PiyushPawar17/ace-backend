import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
// import { differenceInDays } from 'date-fns';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(user: CreateUserDto) {
		const { email, name, profilePicture } = user;

		const newUser = await this.prisma.user.create({
			data: {
				email,
				name,
				profilePicture
			}
		});

		return newUser;
	}

	async getUserByEmail(email: string) {
		const user = await this.prisma.user.findFirst({ where: { email } });

		return user;
	}

	async getUserById(id: string) {
		const user = await this.prisma.user.findFirst({ where: { id } });

		return user;
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.getUserById(id);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		// if (!user.isActive) {
		// 	throw new BadRequestException('Cannot update inactive user');
		// }

		type FieldsToUpdate = UpdateUserDto & { lastUsernameEdit?: Date };

		const { name, username, profilePicture } = updateUserDto;
		const fieldsToUpdate: FieldsToUpdate = { name, profilePicture };
		// const daysSinceUsernameUpdate = differenceInDays(Date.now(), user.lastUsernameEdit);

		if (username) {
			// if (daysSinceUsernameUpdate < 15) {
			// 	throw new BadRequestException('Username has already been updated once within last 15 days');
			// }

			const doesUsernameExist = await this.checkIfUsernameExist(username);

			if (doesUsernameExist) {
				throw new BadRequestException('Username already exist');
			}

			fieldsToUpdate.username = username.toLowerCase();
			fieldsToUpdate.lastUsernameEdit = new Date();
		}

		const updatedUser = await this.prisma.user.update({ where: { id }, data: fieldsToUpdate });

		return updatedUser;
	}

	async checkIfUsernameExist(username: string) {
		// const user = await this.prisma.user.findFirst({ where: { username } });

		return false;
	}

	async deactivateUser(id: string) {
		const user = await this.prisma.user.findFirst({ where: { id } });

		if (!user) {
			throw new NotFoundException('User not found');
		}

		// if (!user.isActive) {
		// 	throw new BadRequestException('Cannot update inactive user');
		// }

		const updatedUser = await this.prisma.user.update({ where: { id }, data: {} });

		return {
			message: 'User profile deactivated',
			user: updatedUser
		};
	}
}

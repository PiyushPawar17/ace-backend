import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dtos';

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
}

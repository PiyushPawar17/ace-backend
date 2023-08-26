import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto, UpdateListDto } from './dtos';

@Injectable()
export class ListService {
	constructor(private readonly prisma: PrismaService) {}

	async createList(userId: string, createListDto: CreateListDto) {
		const { name } = createListDto;

		const newList = await this.prisma.list.create({
			data: {
				name
			}
		});

		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				lists: {
					connect: {
						id: newList.id
					}
				}
			}
		});

		return newList;
	}

	async getList(id: string) {
		return this.prisma.list.findFirst({
			where: { id },
			select: {
				name: true,
				id: true,
				tasks: {
					select: {
						id: true,
						title: true,
						description: true,
						dueDate: true,
						priority: true,
						status: true,
						listId: true
					}
				}
			}
		});
	}

	async updateList(id: string, updateListDto: UpdateListDto) {
		const { name } = updateListDto;

		const newList = await this.prisma.list.update({
			where: { id },
			select: {
				name: true,
				id: true,
				tasks: true
			},
			data: {
				name
			}
		});

		return newList;
	}

	removeList(id: string) {
		return this.prisma.list.delete({ where: { id } });
	}
}

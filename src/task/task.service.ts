import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Injectable()
export class TaskService {
	constructor(private readonly prisma: PrismaService) {}

	async getTask(taskId: string) {
		return this.prisma.task.findFirst({
			where: { id: taskId },
			select: {
				id: true,
				title: true,
				description: true,
				dueDate: true,
				priority: true,
				status: true,
				listId: true
			}
		});
	}

	async createTask(createTaskDto: CreateTaskDto, listId: string) {
		const { title, description, dueDate, priority, status } = createTaskDto;

		const newTask = await this.prisma.task.create({
			data: {
				title,
				description,
				dueDate: new Date(dueDate),
				priority,
				status
			},
			select: {
				id: true,
				title: true,
				description: true,
				dueDate: true,
				priority: true,
				status: true,
				listId: true
			}
		});

		await this.prisma.list.update({
			where: { id: listId },
			data: {
				tasks: {
					connect: {
						id: newTask.id
					}
				}
			},
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

		return newTask;
	}

	async updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
		const { title, description, dueDate, priority, status } = updateTaskDto;

		const updatedTask = await this.prisma.task.update({
			where: {
				id: taskId
			},
			data: {
				title,
				description,
				dueDate,
				priority,
				status
			},
			select: {
				id: true,
				title: true,
				description: true,
				dueDate: true,
				priority: true,
				status: true,
				listId: true
			}
		});

		return updatedTask;
	}

	removeTask(taskId: string) {
		return this.prisma.task.delete({ where: { id: taskId } });
	}
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Injectable()
export class TaskService {
	constructor(private readonly prisma: PrismaService) {}

	async createTask(createTaskDto: CreateTaskDto, listId: string) {
		const { title, description, dueDate, priority } = createTaskDto;

		const newTask = await this.prisma.task.create({
			data: {
				title,
				description,
				dueDate,
				priority
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
			}
		});

		return updatedTask;
	}

	removeTask(taskId: string) {
		return this.prisma.task.delete({ where: { id: taskId } });
	}
}

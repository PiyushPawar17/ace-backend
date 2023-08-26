import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get(':taskId')
	getTask(@Param('taskId') taskId: string) {
		return this.taskService.getTask(taskId);
	}

	@Post(':listId')
	createTask(@Param('listId') listId: string, @Body() createTaskDto: CreateTaskDto) {
		return this.taskService.createTask(createTaskDto, listId);
	}

	@Patch(':taskId')
	updateTask(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.taskService.updateTask(taskId, updateTaskDto);
	}

	@Delete(':taskId')
	removeTask(@Param('taskId') taskId: string) {
		return this.taskService.removeTask(taskId);
	}
}

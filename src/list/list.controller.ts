import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';

import { ListService } from './list.service';
import { CreateListDto, UpdateListDto } from './dtos';
import { AuthGuard } from '../guards';

import { Request } from 'express';

@Controller('list')
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Post()
	@UseGuards(AuthGuard)
	createList(@Req() req: Request, @Body() createListDto: CreateListDto) {
		return this.listService.createList(req.user.id, createListDto);
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	getList(@Param('id') id: string) {
		return this.listService.getList(id);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
		return this.listService.updateList(id, updateListDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	removeList(@Param('id') id: string) {
		return this.listService.removeList(id);
	}
}

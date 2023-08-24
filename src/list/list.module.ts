import { Module } from '@nestjs/common';

import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TaskService } from '../task/task.service';

@Module({
	controllers: [ListController],
	providers: [ListService, PrismaService, TaskService]
})
export class ListModule {}

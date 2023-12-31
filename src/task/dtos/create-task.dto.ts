import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Priority, Status } from '@prisma/client';

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(100)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	title: string;

	@IsString()
	@MaxLength(200)
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	description: string;

	@IsOptional()
	dueDate: Date;

	@IsOptional()
	@IsEnum(Priority)
	priority: Priority;

	@IsOptional()
	@IsEnum(Status)
	status: Status;
}

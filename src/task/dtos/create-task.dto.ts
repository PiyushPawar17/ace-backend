import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Priority } from '@prisma/client';

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
	@IsDate()
	dueDate: Date;

	@IsOptional()
	@IsEnum(Priority)
	priority: Priority;
}

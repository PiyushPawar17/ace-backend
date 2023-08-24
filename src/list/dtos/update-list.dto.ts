import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateListDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	@IsOptional()
	name: string;
}

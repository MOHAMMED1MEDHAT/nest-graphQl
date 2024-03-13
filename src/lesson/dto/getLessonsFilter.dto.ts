import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

type SortOrder = 'ASC' | 'DESC';
export class GetLessonsFilterDto {
	@IsOptional()
	@IsString()
	search: string;

	@IsOptional()
	@IsNumber()
	page: number;

	@IsOptional()
	@IsNumber()
	limit: number;

	@IsOptional()
	@IsString()
	fields: string;

	@IsOptional()
	@IsString()
	@IsIn(['title', 'description', 'status'])
	sortBy: string;

	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	sortOrder: SortOrder;
}

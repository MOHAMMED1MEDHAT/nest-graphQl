import { IsString } from 'class-validator';

export class LessonDto {
	@IsString()
	name: string;
	@IsString()
	startDate: string;
	@IsString()
	endDate: string;
}

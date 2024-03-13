import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
	constructor(private lessonService: LessonService) {}
	@Query((returns) => LessonType)
	lessons(): LessonType {
		return {
			id: '123',
			name: 'bio 101',
			startDate: new Date().toISOString(),
			endDate: new Date().toISOString(),
		};
	}

	@Mutation((returns) => LessonType)
	createLesson(
		@Args('name') name: string,
		@Args('startDate') startDate: string,
		@Args('endDate') endDate: string,
	) {
		const lesson = this.lessonService.createLesson({
			name,
			startDate,
			endDate,
		});
		return lesson;
	}
}

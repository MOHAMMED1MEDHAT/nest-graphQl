import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
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
	createLesson(): void {}
}

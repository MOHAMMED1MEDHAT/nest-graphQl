import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
	imports: [],
	controllers: [],
	providers: [LessonResolver, LessonService],
})
export class LessonModule {}

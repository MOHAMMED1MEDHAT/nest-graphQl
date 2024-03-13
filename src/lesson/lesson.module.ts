import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonRepository } from './lesson.repository';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
	imports: [TypeOrmModule.forFeature([Lesson])],
	controllers: [],
	providers: [LessonResolver, LessonService, LessonRepository],
})
export class LessonModule {}

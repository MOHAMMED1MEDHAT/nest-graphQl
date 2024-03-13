import { Injectable } from '@nestjs/common';
import { GetLessonsFilterDto, LessonDto } from './dto';
import { Lesson } from './lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
	constructor(private readonly lessonRepository: LessonRepository) {}

	async getAllLessons(filterDto: GetLessonsFilterDto): Promise<Lesson[]> {
		return this.lessonRepository.getAllLessons(filterDto);
	}

	async getLessonById(id: string): Promise<Lesson> {
		return this.lessonRepository.getLessonById(id);
	}

	async createLesson(lessonDto: LessonDto): Promise<Lesson> {
		return await this.lessonRepository.createLesson(lessonDto);
	}

	async updateLesson(id: string, lesson: Lesson): Promise<Lesson> {
		return this.lessonRepository.updateLesson(id, lesson);
	}
}

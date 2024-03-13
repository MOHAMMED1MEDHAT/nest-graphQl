import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GetLessonsFilterDto, LessonDto } from './dto';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
	private logger = new Logger('LessonRepository');
	constructor(private dataSource: DataSource) {
		super(Lesson, dataSource.createEntityManager());
		this.dataSource = dataSource;
	}

	async getAllLessons(filterDto?: GetLessonsFilterDto): Promise<Lesson[]> {
		const { search, page, limit, fields, sortBy, sortOrder } = filterDto;
		const query = this.createQueryBuilder('Lesson');

		if (search) {
			query.where(
				'Lesson.title LIKE :search OR Lesson.description LIKE :search',
				{
					search: `%${search}%`,
				},
			);
		}

		if (fields) {
			const fieldsMap = [...fields.split(',')]
				.filter(
					(field) =>
						field == 'status' || field == 'title' || field == 'description',
				)
				.map((field) => `Lesson.${field}`);
			query.select(fieldsMap);
		}

		if (sortBy) {
			query.orderBy(sortBy, sortOrder);
		}

		if (page && limit) {
			query.skip((page - 1) * limit).take(limit);
		}

		try {
			return await query.getMany();
		} catch (err) {
			this.logger.error(
				`Failed to get Lessons Filters: ${JSON.stringify(filterDto)}`,
				err.stack,
			);
			throw new InternalServerErrorException();
		}
	}

	async getLessonById(id: string): Promise<Lesson> {
		const found = await this.findOne({ where: { id } });

		if (!found) {
			return null;
		}

		return found;
	}

	async createLesson(lessonDto: LessonDto): Promise<Lesson> {
		const { name, startDate, endDate } = lessonDto;
		const lesson = await this.create({ name, startDate, endDate });
		try {
			await this.save(lesson);
		} catch (err) {
			this.logger.error(
				`Failed to create a Lesson Data: ${JSON.stringify(LessonDto)}`,
				err.stack,
			);
			throw new InternalServerErrorException();
		}

		return lesson;
	}

	async deleteLesson(id: string): Promise<void> {
		const result = await this.delete({ id });

		if (result.affected === 0) {
			throw new InternalServerErrorException(`Lesson with ID: ${id} not found`);
		}
	}
}

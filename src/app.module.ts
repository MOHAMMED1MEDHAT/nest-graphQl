import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
		}),
		LessonModule,
	],
})
export class AppModule {}

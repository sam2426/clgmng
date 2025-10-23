import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { WinstonModule } from 'nest-winston';
import loggerHelper from './helpers/logger.helper';

@Module({
  imports: [PrismaModule, StudentsModule, CoursesModule, ProfessorsModule, EnrollmentsModule, 
    WinstonModule.forRoot(loggerHelper)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

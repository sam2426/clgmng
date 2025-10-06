import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateCourseDto {
  code: string;
  title: string;
  description?: string;
  professorId?: string;
}

export interface UpdateCourseDto {
  code?: string;
  title?: string;
  description?: string;
  professorId?: string | null;
}

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCourseDto) {
    return this.prisma.course.create({ data });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}

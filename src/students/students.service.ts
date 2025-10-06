import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateStudentDto) {
    return this.prisma.student.create({ data });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateStudentDto) {
    return this.prisma.student.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.student.delete({ where: { id } });
  }
}

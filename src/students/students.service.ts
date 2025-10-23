import { Inject, Injectable } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { customStringify } from 'src/helpers/utility.helper';

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
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER)
  private readonly logger: LoggerService, private readonly prisma: PrismaService) {}

  create(data: CreateStudentDto) {
    return this.prisma.student.create({ data });
  }

  async findAll() {
    const students = await this.prisma.student.findMany();
    this.logger.log({label: 'StudentsService', message: `Students fetched successfully: ${customStringify(students)}`});
    return students;
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateEnrollmentDto {
  studentId: string;
  courseId: string;
  grade?: number;
}

export interface UpdateEnrollmentDto {
  grade?: number | null;
}

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({ data });
  }

  findAll() {
    return this.prisma.enrollment.findMany();
  }

  findOne(id: string) {
    return this.prisma.enrollment.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateEnrollmentDto) {
    return this.prisma.enrollment.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}

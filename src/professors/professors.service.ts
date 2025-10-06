import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateProfessorDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateProfessorDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

@Injectable()
export class ProfessorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProfessorDto) {
    return this.prisma.professor.create({ data });
  }

  findAll() {
    return this.prisma.professor.findMany();
  }

  findOne(id: string) {
    return this.prisma.professor.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateProfessorDto) {
    return this.prisma.professor.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.professor.delete({ where: { id } });
  }
}

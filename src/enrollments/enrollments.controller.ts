import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  create(@Body() body: CreateEnrollmentDto) {
    return this.enrollmentsService.create(body);
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}

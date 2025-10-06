import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import type { CreateCourseDto, UpdateCourseDto } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() body: CreateCourseDto) {
    return this.coursesService.create(body);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCourseDto) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import type { CreateProfessorDto, UpdateProfessorDto } from './professors.service';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Post()
  create(@Body() body: CreateProfessorDto) {
    return this.professorsService.create(body);
  }

  @Get()
  findAll() {
    return this.professorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProfessorDto) {
    return this.professorsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorsService.remove(id);
  }
}

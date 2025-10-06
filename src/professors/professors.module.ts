import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
  imports: [PrismaModule],
})
export class ProfessorsModule {}

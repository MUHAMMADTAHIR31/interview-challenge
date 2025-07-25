import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Assignment } from './entities/assignment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Medication } from '../medication/entities/medication.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Assignment, Patient, Medication])],
    controllers: [AssignmentController],
    providers: [AssignmentService],
})
export class AssignmentModule { }

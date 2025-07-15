import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Medication } from '../medication/entities/medication.entity';

@Injectable()
export class AssignmentService {
    constructor(
        @InjectRepository(Assignment)
        private assignmentRepo: Repository<Assignment>,
    ) { }

    create(dto: CreateAssignmentDto) {
        const assignment = this.assignmentRepo.create({
            ...dto,
            patient: { id: dto.patientId } as Patient,
            medication: { id: dto.medicationId } as Medication,
        });
        return this.assignmentRepo.save(assignment);
    }

    findAll() {
        return this.assignmentRepo.find();
    }

    async findOne(id: number) {
        const assignment = await this.assignmentRepo.findOne({
            where: { id },
        });
        if (!assignment) throw new NotFoundException('Assignment not found');
        return assignment;
    }


    async update(id: number, dto: UpdateAssignmentDto) {
        const assignment = await this.findOne(id); // this now returns with patient & medication
        Object.assign(assignment, {
            ...dto,
            patient: { id: dto.patientId } as Patient,
            medication: { id: dto.medicationId } as Medication,
        });
        return this.assignmentRepo.save(assignment);
    }


    async remove(id: number) {
        const result = await this.assignmentRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Assignment not found');
        }
    }

    /** 🔢 Remaining days logic with unit-test support */
    calculateRemainingDays(startDate: string, numberOfDays: number): number {
        const start = new Date(startDate);
        const today = new Date();
        const end = new Date(start);
        end.setDate(start.getDate() + numberOfDays);
        const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
    }

    async getRemainingDays(id: number): Promise<{ assignmentId: number; remainingDays: number }> {
        const assignment = await this.findOne(id);
        const remainingDays = this.calculateRemainingDays(assignment.startDate, assignment.numberOfDays);
        return { assignmentId: assignment.id, remainingDays };
    }
}

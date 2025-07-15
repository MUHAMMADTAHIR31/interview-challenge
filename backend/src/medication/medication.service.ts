import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationService {
    constructor(
        @InjectRepository(Medication)
        private readonly medicationRepo: Repository<Medication>,
    ) { }

    create(dto: CreateMedicationDto) {
        const medication = this.medicationRepo.create(dto);
        return this.medicationRepo.save(medication);
    }

    findAll() {
        return this.medicationRepo.find();
    }

    async findOne(id: number) {
        const med = await this.medicationRepo.findOneBy({ id });
        if (!med) throw new NotFoundException('Medication not found');
        return med;
    }

    async update(id: number, dto: UpdateMedicationDto) {
        const med = await this.findOne(id);
        Object.assign(med, dto);
        return this.medicationRepo.save(med);
    }

    async remove(id: number) {
        const result = await this.medicationRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Medication not found');
        }
    }
}

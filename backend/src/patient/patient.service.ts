import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) { }

    async create(dto: CreatePatientDto): Promise<Patient> {
        const patient = this.patientRepository.create(dto);
        return await this.patientRepository.save(patient);
    }

    findAll(): Promise<Patient[]> {
        return this.patientRepository.find();
    }

    async findOne(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOneBy({ id });
        if (!patient) throw new NotFoundException('Patient not found');
        return patient;
    }

    async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
        const patient = await this.findOne(id);
        Object.assign(patient, dto);
        return this.patientRepository.save(patient);
    }

    async remove(id: number): Promise<void> {
        const result = await this.patientRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Patient not found');
        }
    }
}

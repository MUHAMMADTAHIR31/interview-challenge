import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
    @IsNotEmpty()
    patientId: number;

    @IsNotEmpty()
    medicationId: number;

    @IsDateString()
    startDate: string;

    @IsInt()
    numberOfDays: number;
}

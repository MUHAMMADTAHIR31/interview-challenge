import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Medication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dosage: string;

    @Column()
    frequency: string;

    @CreateDateColumn()
    createdAt: Date;
}

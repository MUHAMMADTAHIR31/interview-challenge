import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';

describe('AssignmentService', () => {
    let service: AssignmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AssignmentService,
                {
                    provide: getRepositoryToken(Assignment),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<AssignmentService>(AssignmentService);
    });

    describe('calculateRemainingDays()', () => {
        it('should return full number of days if today is before end date', () => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 2); // started 2 days ago
            const isoStart = startDate.toISOString().split('T')[0];

            const result = service.calculateRemainingDays(isoStart, 5); // ends in 3 days
            expect(result).toBe(3);
        });

        it('should return 0 if treatment is expired', () => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 10);
            const isoStart = startDate.toISOString().split('T')[0];

            const result = service.calculateRemainingDays(isoStart, 5); // ended 5 days ago
            expect(result).toBe(0);
        });

        it('should return 1 if today is the last treatment day', () => {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 4); // started 4 days ago
            const isoStart = startDate.toISOString().split('T')[0];

            const result = service.calculateRemainingDays(isoStart, 5); // ends today
            expect(result).toBe(1);
        });
    });
});

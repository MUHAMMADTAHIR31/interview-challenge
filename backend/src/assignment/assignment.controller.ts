import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Post()
    create(@Body() dto: CreateAssignmentDto) {
        return this.assignmentService.create(dto);
    }

    @Get()
    findAll() {
        return this.assignmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.assignmentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAssignmentDto) {
        return this.assignmentService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.assignmentService.remove(id);
    }

    /** 🔢 Remaining Days Endpoint */
    @Get(':id/remaining-days')
    getRemainingDays(@Param('id', ParseIntPipe) id: number) {
        return this.assignmentService.getRemainingDays(id);
    }
}

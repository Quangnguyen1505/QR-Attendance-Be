import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendanceLogService } from './attendance-log.service';
import { CreateAttendanceLogDto } from './dto/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from './dto/update-attendance-log.dto';

@Controller('attendance-log')
export class AttendanceLogController {
  constructor(private readonly attendanceLogService: AttendanceLogService) {}

  @Post()
  create(@Body() createAttendanceLogDto: CreateAttendanceLogDto) {
    return this.attendanceLogService.create(createAttendanceLogDto);
  }

  @Get()
  findAll() {
    return this.attendanceLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceLogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceLogDto: UpdateAttendanceLogDto,
  ) {
    return this.attendanceLogService.update(+id, updateAttendanceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceLogService.remove(+id);
  }
}

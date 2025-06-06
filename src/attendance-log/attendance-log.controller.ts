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
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Controller('attendance-log')
export class AttendanceLogController {
  constructor(
    private readonly attendanceLogService: AttendanceLogService,
    private readonly configService: ConfigService,
  ) {}

  @Post('scan')
  create(@Body() body: { token: string }) {
    const secret = this.configService.get<string>('JWT_SECRET');
    console.log('JWT Secret:', secret);

    const token = body.token;

    if (!token) {
      throw new Error('Token body parameter is required');
    }
    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    const data = jwt.verify(token, secret) as CreateAttendanceLogDto;
    console.log('Decoded data:', data);

    return this.attendanceLogService.create(data);
  }

  @Get()
  findAll() {
    return this.attendanceLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceLogDto: UpdateAttendanceLogDto,
  ) {
    return this.attendanceLogService.update(id, updateAttendanceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceLogService.remove(id);
  }
}

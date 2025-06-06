import { Injectable } from '@nestjs/common';
import { CreateAttendanceLogDto } from './dto/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from './dto/update-attendance-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from '@prisma/client';

@Injectable()
export class AttendanceLogService {
  constructor(
    private readonly prisma: PrismaService,
    private employeeService: EmployeeService,
  ) {}

  /**
   * Creates a new attendance log entry.
   * @param createAttendanceLogDto - The data transfer object containing the details of the attendance log to be created.
   * @returns A message indicating that a new attendance log has been added.
   */
  async create(createAttendanceLogDto: CreateAttendanceLogDto) {
    console.log('Creating attendance log with data:', createAttendanceLogDto);
    let employee: Employee | null = null;
    employee = await this.employeeService.findQrCode(
      createAttendanceLogDto.code,
    );
    if (!employee) {
      employee = await this.employeeService.create({
        name: createAttendanceLogDto.name,
        code: createAttendanceLogDto.code,
      });
    }
    const attendanceLog = await this.prisma.attendanceLog.create({
      data: {
        employeeId: employee.id,
        start_time: createAttendanceLogDto.start_time,
        note: createAttendanceLogDto.note,
        scannedAt: new Date(),
        type: createAttendanceLogDto.type,
      },
    });
    return attendanceLog;
  }

  findAll() {
    return this.prisma.attendanceLog.findMany();
  }

  findOne(id: string) {
    return this.prisma.attendanceLog.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateAttendanceLogDto: UpdateAttendanceLogDto) {
    return this.prisma.attendanceLog.update({
      where: {
        id,
      },
      data: {
        ...updateAttendanceLogDto,
        type: updateAttendanceLogDto.type,
      },
    });
  }

  remove(id: string) {
    return this.prisma.attendanceLog.delete({
      where: {
        id,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { AttendanceLogService } from './attendance-log.service';
import { AttendanceLogController } from './attendance-log.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [AttendanceLogController],
  providers: [AttendanceLogService, PrismaService],
})
export class AttendanceLogModule {}

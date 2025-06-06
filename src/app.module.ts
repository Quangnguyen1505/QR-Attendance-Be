import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceLogModule } from './attendance-log/attendance-log.module';

@Module({
  imports: [PrismaModule, EmployeeModule, AttendanceLogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

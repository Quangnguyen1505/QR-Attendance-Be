import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceLogModule } from './attendance-log/attendance-log.module';
import { ConfigModule } from '@nestjs/config';
import { QrService } from './qr/qr.service';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EmployeeModule,
    AttendanceLogModule,
    QrModule,
  ],
  providers: [QrService],
})
export class AppModule {}

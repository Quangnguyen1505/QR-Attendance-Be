import { Module } from '@nestjs/common';
import { AttendanceLogService } from './attendance-log.service';
import { AttendanceLogController } from './attendance-log.controller';

@Module({
  controllers: [AttendanceLogController],
  providers: [AttendanceLogService],
})
export class AttendanceLogModule {}

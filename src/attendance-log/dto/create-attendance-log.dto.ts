import { EnumAttendanceType } from '@prisma/client';

export class CreateAttendanceLogDto {
  name: string;
  code: string;
  start_time: Date;
  note?: string;
  type?: EnumAttendanceType;
  scannedAt?: Date;
}

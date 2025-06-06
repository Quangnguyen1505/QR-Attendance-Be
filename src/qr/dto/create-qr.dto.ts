import { EnumAttendanceType } from '@prisma/client';

export class CreateQRDto {
  name: string;
  code: string;
  start_time: Date;
  note?: string;
  type?: EnumAttendanceType;
}

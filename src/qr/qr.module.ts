import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QrService } from './qr.service';

@Module({
  controllers: [QrController, QrController],
  providers: [QrService, PrismaService],
})
export class QrModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateQRDto } from './dto/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private qrService: QrService) {}
  @Post('generate')
  generateQrCode(@Body() createQRDto: CreateQRDto) {
    if (!createQRDto.code) {
      throw new Error('Code body parameter is required');
    }
    return this.qrService.generateQrCode(createQRDto);
  }
}

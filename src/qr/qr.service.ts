import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { CreateQRDto } from './dto/create-qr.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrService {
  constructor(private readonly configService: ConfigService) {}

  async generateQrCode(data: CreateQRDto): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }
    const payload = {
      code: data.code,
      name: data.name,
      start_time: data.start_time,
      note: data.note,
      type: data.type,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '10m' });
    console.log('Generated JWT token:', token);
    const qrContent = `https://your-client.com/attendance?token=${token}`;
    const qrBase64 = await QRCode.toDataURL(qrContent);
    return qrBase64;
  }
}

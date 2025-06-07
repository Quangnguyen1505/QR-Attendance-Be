import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginAuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }

      const payload = {
        sub: user.id,
        email: user.email,
      };

      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      if (!jwtSecret) {
        throw new Error('JWT secret is not defined in environment variables');
      }

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '10m' });

      return {
        access_token: token,
      };
    } catch {
      throw new UnauthorizedException('Đăng nhập không thành công');
    }
  }

  async changePassword(data: ChangePasswordDto): Promise<{ message: string }> {
    const { userId, newPassword } = data;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }
}

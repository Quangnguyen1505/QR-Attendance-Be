import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceLogModule } from './attendance-log/attendance-log.module';
import { ConfigModule } from '@nestjs/config';
import { QrService } from './qr/qr.service';
import { QrModule } from './qr/qr.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EmployeeModule,
    AttendanceLogModule,
    QrModule,
    AuthModule,
  ],
  providers: [QrService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/change-password', method: RequestMethod.POST });
  }
}

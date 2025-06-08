import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceLogModule } from './attendance-log/attendance-log.module';
import { ConfigModule } from '@nestjs/config';
import { QrService } from './qr/qr.service';
import { QrModule } from './qr/qr.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AuthController } from './auth/auth.controller';
import { AttendanceLogController } from './attendance-log/attendance-log.controller';
import { EmployeeController } from './employee/employee.controller';

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
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'qr/generate', method: RequestMethod.POST },
        { path: 'attendance-log/scan', method: RequestMethod.POST },
      )
      .forRoutes(AuthController, AttendanceLogController, EmployeeController);
  }
}

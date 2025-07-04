import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
  });

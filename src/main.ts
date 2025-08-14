import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`Сервер стартовал по адресу http://localhost:${port}`),
  );
}
bootstrap();

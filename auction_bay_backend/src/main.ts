import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  /**
   * SWAGGER configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS Masterclass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:4000')
    .setTermsOfService('http://localhost:4000/terms-of-service')
    .setLicense('MIT License', 'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt')
    .addServer('http://localhost:4000')
    .setVersion('1.0').build();
  
    // instantionate Documnent object
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

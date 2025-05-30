import {
	BadRequestException,
	INestApplication,
	Logger,
	ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ServerResponse } from 'http';
import * as path from 'path';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './base/filter/exception-handler.filter';
import { QueryExecutionTimeInterceptor } from './base/interceptor/query-execution-time.interceptor';
import { TransformInterceptor } from './base/interceptor/transform.interceptor';
import { CustomLogger } from './shared/logger/custom-logger';
import { Validation } from './shared/mapper/errorValidation.mapper';

function enableGlobalValidations(app: INestApplication) {
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalInterceptors(new QueryExecutionTimeInterceptor());

  app.useGlobalFilters(new ExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result = Validation.formatErrorData(errors);
        return new BadRequestException(result);
      },
    }),
  );
  app.enableCors({
    origin: '*',
  });
}

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Restful Chat api')
    .setDescription(``)
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setExternalDoc('Postman Collection', path.join(__dirname, 'docs-json'))
    .build();

  const metadata_ts = './metadata';
  if (fs.existsSync(path.join(__dirname, 'metadata.js'))) {
    const metadata = await import(metadata_ts);
    await SwaggerModule.loadPluginMetadata(metadata.default);
  }

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use('/api-doc', (_, res: ServerResponse) =>
    res.end(JSON.stringify(document)),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  setupSwagger(app);
  enableGlobalValidations(app);

  app.listen(process.env.APP_PORT);

  Logger.log('Server started ' + process.env.APP_PORT, 'BOOTSTRAP');
}

bootstrap();

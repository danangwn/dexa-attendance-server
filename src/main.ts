import { Global } from './global';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as fileUpload from 'express-fileupload';
import { Connection } from 'typeorm';
import { AppModule } from './app.module';
import { Config } from './helpers/config.helper';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setBaseViewsDir(Global.dir() + '/../src/views');
  app.setViewEngine('hbs');
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
  // app.use(fileUpload({ limits: { fileSize: 200 * 1024 * 1024 }, useTempFiles: true }));
  app.listen(Config.getNumber('APP_PORT'));
  Logger.log(`__dirname: ${Global.dir()}`);
  Logger.log(`Greatday Recruitment, running on port: ${Config.getNumber('APP_PORT')}`);
}
bootstrap();

// for database connections
export const connections: Map<string, Connection> = new Map();
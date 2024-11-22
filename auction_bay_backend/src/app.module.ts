import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const ENV = process.env.NODE_ENV;
console.log("ENV:", ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: ENV ? `.env.${ENV}` : '.env',
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation
    }),
    // npm i typeorm@0.3.20 @nestjs/typeorm@10.0.2 pg@8.11.5
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        // synchronize: true,  // only use it in dev mode
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name')
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),  // Path to the public folder
      serveRoot: '/',                             // Base URL path for serving static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

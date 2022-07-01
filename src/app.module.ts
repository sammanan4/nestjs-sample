import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    PersonModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

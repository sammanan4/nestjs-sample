import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PersonModule } from './../../src/person/person.module';
import { PersonService } from './../../src/person/person.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PersonController (e2e)', () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
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
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
    // afterEach(async () => {
    //     await moduleFixture.close();
    // });
    afterAll(async () => {
        if (moduleFixture)
            await moduleFixture.close();
        // done();
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/person')
            .expect(200)
            .expect(function (res) {
                console.log(res.body);

            });
    });
});

import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { FirstGatwayGateway } from './first-gatway.gateway';
import { NewsGateway } from './news.gateway';

@Module({
    imports: [MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])],
    controllers: [PersonController],
    providers: [PersonService, NewsGateway],
    exports: [PersonService]
})
export class PersonModule { }

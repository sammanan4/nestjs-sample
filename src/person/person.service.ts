import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonDto } from './dto/person.dto';
import { Person, PersonDocument } from './schemas/person.schema';


@Injectable()
export class PersonService {

    constructor(@InjectModel(Person.name) private readonly personModel: Model<PersonDocument>){}

    async findAll(): Promise<Person[]> {
        return await this.personModel.find().exec();
    }

    async create(person: PersonDto): Promise<Person>{
        const newPerson = new this.personModel(person);
        return await newPerson.save();
    }


    async findOne( id: string): Promise<Person> {
        return await this.personModel.findOne({_id: id}).exec();
    }


    async findAndDelete(id: string): Promise<Person> {
        return await this.personModel.findByIdAndRemove(id).exec();
    }

    async findAndUpdate(id: string, data: PersonDto): Promise<Person> {
        return await this.personModel.findByIdAndUpdate(id, data, {new: true}).exec();
    }
}

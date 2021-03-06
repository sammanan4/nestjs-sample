import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type PersonDocument = Person & Document;


@Schema()
export class Person {
    @Prop({ required: true})
    name: string;

    @Prop()
    age: number
}

export const PersonSchema = SchemaFactory.createForClass(Person);
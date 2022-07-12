import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop({ 
        required: true, 
        unique: true, 
        index: true, 
        lowercase: true, 
        trim: true, 
        minlength: 5, 
        maxlength: 20,
        // match: /^[a-zA-Z][a-zA-Z0-9_\.]*@[a-zA-Z0-9]\.(com|org)$/ 
    })
    email: string;

    @Prop({
        required: true
    })
    hashedPassword: string
}

export const UserSchema = SchemaFactory.createForClass(User);
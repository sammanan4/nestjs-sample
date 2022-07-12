import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { NewUserInterface } from './interfaces/newuser.interface';
import { ReturnUserInterface } from './interfaces/user.return.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}


    async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find().exec();
    }

    async create(newUser: NewUserInterface): Promise<ReturnUserInterface> {
        const user = new this.userModel(newUser);
        const savedUser = await user.save();
        return {
            id: savedUser._id,
            email: savedUser.email,
        };
    }
    
    async findOne(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async update(id: string, userDto: UserDto): Promise<UserDocument> {
        // do not update password here because hashing is required
        const { password, ...user } = { ...userDto };
        return await this.userModel.findByIdAndUpdate(id, user).exec();
    }

    async delete(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}

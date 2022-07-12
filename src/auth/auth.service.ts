import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }


    async validateUser(email: string, password: string): Promise<UserDocument|null> {
        const user = await this.userService.findOne(email);
        if (user && await this.comparePassword(password, user.hashedPassword)) {
            // const { hashedPassword, ...result } = user;
            return user;
        }
        return null;
    }

    async login(user: LoginDto) {
        const dbUser = await this.validateUser(user.email, user.password);
        if(dbUser){
            const payload = { email: dbUser.email, sub: dbUser._id };
            return {
                email: user.email,
                access_token: this.jwtService.sign(payload)
            };
        }
        throw new HttpException('Invalid credentials', 401);
    }

    async register(user: RegisterDto) {
        const hashedPassword = await this.hashPassword(user.password);
        const newUser = {
            email: user.email,
            hashedPassword: hashedPassword
        }
        return await this.userService.create(newUser);
    }
}

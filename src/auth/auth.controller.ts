import { Body, Controller, Post } from '@nestjs/common';
import { ReturnUserInterface } from '../user/interfaces/user.return.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginInterface } from './interfaces/login.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<LoginInterface> {
        return this.authService.login(loginDto);
    }


    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<ReturnUserInterface> {
        return this.authService.register(registerDto);
    }
}

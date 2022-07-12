import { Matches } from 'class-validator';

export class LoginDto {
    @Matches(/^[a-zA-Z][a-zA-Z0-9_\.]*@[a-zA-Z0-9]\.(com|org)$/)
    readonly email: string
    
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
    readonly password: string
}
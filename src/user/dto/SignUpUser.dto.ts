import { RoleEnum } from "../../enum/Role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SignUpUserDTO{
    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    organization: string;

    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: RoleEnum;

    @IsNumberString()
    @IsNotEmpty()
    @IsOptional()
    phone: string;
}
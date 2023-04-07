import { RoleEnum } from '../../enum/Role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
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

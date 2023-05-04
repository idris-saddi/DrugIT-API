import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateInfoDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  organization: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  phone: string;
}

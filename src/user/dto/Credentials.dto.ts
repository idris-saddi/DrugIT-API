import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}

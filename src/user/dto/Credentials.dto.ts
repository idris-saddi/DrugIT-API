import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

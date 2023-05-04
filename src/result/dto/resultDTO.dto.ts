import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ResultDTO {
  @IsNumber()
  @IsNotEmpty()
  target: number;
  @IsNumber()
  @IsNotEmpty()
  molecule: number;
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

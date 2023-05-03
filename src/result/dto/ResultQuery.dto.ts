import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResultQueryDTO {
  @IsNotEmpty()
  @IsNumber()
  target: number;
  @IsNotEmpty()
  @IsNumber()
  molecule: number;
}

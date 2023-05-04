import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusEnum } from 'src/enum/Status.enum';

export class CreateRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  molecule: number;
  @IsNotEmpty()
  @IsNumber()
  target: number;
  @IsNotEmpty()
  @IsNumber()
  user: number;
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}

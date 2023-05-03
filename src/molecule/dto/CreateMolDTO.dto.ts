import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMolDto {
  @IsString()
  @IsNotEmpty()
  formula: string;

  @IsNotEmpty()
  @IsNumber()
  molecularWeight: number;

  @IsNotEmpty()
  @IsNumber()
  logP: number;

  @IsNotEmpty()
  @IsNumber()
  numHDonors: number;

  @IsNotEmpty()
  @IsNumber()
  numHAcceptors: number;

  @IsNotEmpty()
  @IsNumber()
  pIC50: number;

  @IsNotEmpty()
  @IsNumber()
  NumHeavyAtoms: number;

  @IsNotEmpty()
  @IsNumber()
  numChiralCentersList: number;

  @IsNotEmpty()
  @IsNumber()
  polarizabilities: number;

  @IsNotEmpty()
  @IsNumber()
  numRings: number;

  @IsNotEmpty()
  @IsNumber()
  rotableBonds: number;
}

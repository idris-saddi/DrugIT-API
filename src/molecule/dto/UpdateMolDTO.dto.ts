import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMolDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  formula: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  molecularWeight: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  logP: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  numHDonors: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  numHAcceptors: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  pIC50: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  NumHeavyAtoms: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  numChiralCentersList: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  polarizabilities: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  numRings: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  rotableBonds: number;
}

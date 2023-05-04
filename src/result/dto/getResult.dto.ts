import { Exclude } from 'class-transformer';

export class getResultDTO {
  id: number;
  target: number;
  molecule: number;
  active: boolean;
  @Exclude()
  created_at: string;

  constructor(partial: Partial<getResultDTO>) {
    Object.assign(this, partial);
  }
}

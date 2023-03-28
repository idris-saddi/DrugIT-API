import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Result {
  @PrimaryColumn({})
  targetID: string;

  @PrimaryColumn({})
  moleculeID: string;

  @Column({
    nullable: false,
  })
  active: boolean;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: string;
}

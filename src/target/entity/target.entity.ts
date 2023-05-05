import { Request } from 'src/request/entity/request.entity';
import { Result } from 'src/result/entity/result.entity';

import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Target {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({})
  name: string;

  @Column({})
  description: string;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: string;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: string;

  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: string;

  @OneToMany(() => Request, (Request) => Request.target)
  requests: Request[];

  @OneToMany(() => Result, (Result) => Result.target)
  results: Result[];
}

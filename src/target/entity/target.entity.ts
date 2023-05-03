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
  JoinColumn,
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
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: Date;

  @OneToMany(() => Request, (Request) => Request.target)
  @JoinColumn()
  requests: Request[];

  @OneToMany(() => Result, (Result) => Result.target)
  @JoinColumn()
  results: Result[];
}

import { Request } from 'src/request/entity/request.entity';
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
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToMany(
    () => Request, 
    (Request) => Request.target, 
    { cascade: true }
  )
  requests: Request[];
}

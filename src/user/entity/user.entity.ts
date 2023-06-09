import { RoleEnum } from 'src/enum/Role.enum';
import { Request } from 'src/request/entity/request.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  Unique,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({})
  @Unique('username', ['username'])
  username: string;

  @Column({})
  @Unique('email', ['email'])
  email: string;

  @Column({})
  password: string;

  @Column({})
  salt: string;

  @Column({
    nullable: true,
  })
  organization: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CLIENT,
  })
  role: RoleEnum;

  @Column({
    default: 100,
  })
  subscription: number;

  @Column({
    default: '0.png',
  })
  image: string;

  @Column({
    nullable: true,
  })
  phone: string;

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

  @OneToMany(() => Request, (Request) => Request.user)
  @JoinColumn()
  requests: Request[];
}

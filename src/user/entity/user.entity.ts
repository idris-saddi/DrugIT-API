import { RoleEnum } from 'src/enum/Role.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({})
  id: string;

  @Column({})
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
  role: string;

  @Column({})
  subscription: string;

  @Column({
    nullable: true,
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
}
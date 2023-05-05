
import { StatusEnum } from 'src/enum/Status.enum';
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Molecule, (Molecule) => Molecule.requests)
  @JoinColumn({ name: 'molecule_id' })
  molecule: Molecule;

  @ManyToOne(() => Target, (Target) => Target.requests)
  @JoinColumn({ name: 'target_id' })
  target: Target;

  @ManyToOne(() => User, (User) => User.requests, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

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
}

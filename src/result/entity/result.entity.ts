
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Target, (Target) => Target.results)
  @JoinColumn({ name: 'target_id' })
  target: Target;

  @ManyToOne(() => Molecule, (Molecule) => Molecule.results)
  @JoinColumn({ name: 'molecule_id' })
  molecule: Molecule;

  @Column({
    nullable: false,
    default: false,
  })
  active: boolean;

  @Column({
    nullable: false,
  })
  confidence: number;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: string;
}

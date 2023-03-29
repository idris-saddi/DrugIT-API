import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Target, (Target) => Target.results)
  @JoinColumn({ name: 'targetId' })
  target: Target;

  @ManyToOne(() => Molecule, (Molecule) => Molecule.results)
  @JoinColumn({ name: 'moleculeId' })
  molecule: Molecule;

  @Column({
    nullable: false,
    default: false,
  })
  active: boolean;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: string;

}

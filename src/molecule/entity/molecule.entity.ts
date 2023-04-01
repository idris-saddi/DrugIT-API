import { Request } from 'src/request/entity/request.entity';
import { Result } from 'src/result/entity/result.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
export class Molecule {
  //uuid
  @PrimaryGeneratedColumn({
    type : "bigint"  
  })
  id:number;

  @Column({
    nullable: false,
  })
  @Unique('formula', ['formula'])
  formula: string;

  @Column({})
  molecularWeight: number;

  @Column({})
  logP: number;

  @Column({})
  numHDonors: number;

  @Column({})
  numHAcceptors: number;

  @Column({})
  pIC50: number;

  @Column({})
  NumHeavyAtoms: number;

  @Column({})
  numChiralCentersList: number;

  @Column({})
  polarizabilities: number;

  @Column({})
  numRings: number;

  @Column({})
  rotableBonds: number;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: string;

  @OneToMany(() => Request, (Request) => Request.molecule)
  requests: Request[];

  @OneToMany(() => Request, (Request) => Request.molecule)
  results: Result[];

}

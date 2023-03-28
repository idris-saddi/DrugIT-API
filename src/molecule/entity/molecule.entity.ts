import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Entity,
    Unique,
  } from 'typeorm';

@Entity()
export class Molecule {
    //uuid
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
}
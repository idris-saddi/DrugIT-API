import { StatusEnum } from "src/enum/Status.enum";
import { Molecule } from "src/molecule/entity/molecule.entity";
import { Target } from "src/target/entity/target.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(
        () => Molecule,
        (Molecule) => Molecule.requests,
        { cascade: true },
    )
    molecule: Molecule;

    @ManyToOne(
        () => Target,
        (Target) => Target.requests,
        { cascade: true },
    )
    target: Target;

    @ManyToOne(
        () => User,
        (User) => User.requests,
        { cascade: true },
    )
    user: User;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.PENDING,
    })
    status: string;

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
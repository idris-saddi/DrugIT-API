import { StatusEnum } from "src/enum/Status.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({})
    moleculeID: string;

    @Column({})
    targetID: string;

    @Column({})
    userID: string;

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
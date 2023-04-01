import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Unique("name",["name"])
  name: string;

  @Column()
  price: number;

  @Column()
  numberOfTests: number
}

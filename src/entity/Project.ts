import { BillingType } from "../interfaces/BillingType";
import { Task } from "./Task";
import { User } from "./User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: BillingType, default: BillingType.NONBILLABLE })
  billingType!: BillingType;

  @Column({ nullable: true })
  clientName?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  members?: User[];

  @OneToMany(() => Task, (task) => task.project)
  @JoinColumn()
  tasks?: Task[];

  @Column({ nullable: true })
  timeBudget?: number;

  @Column()
  title!: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  owner!: User;

  @Column()
  ownerId!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}

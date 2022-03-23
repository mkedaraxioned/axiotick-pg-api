import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BillingType } from "../interfaces/BillingType";
import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class TimeCard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: BillingType, default: BillingType.NONBILLABLE })
  billingType!: BillingType;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  date!: Date;

  @Column()
  logTime!: number;

  @Column()
  notes?: string;

  @ManyToOne(() => Project)
  @JoinColumn()
  project!: Project;

  @Column()
  projectId!: number;

  @ManyToOne(() => Task)
  @JoinColumn()
  task?: Task;

  @Column({ nullable: true })
  taskId?: number;

  @Column()
  title!: string;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  userId!: number;
}

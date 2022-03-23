import { Project } from "./Project";
import { User } from "./User";
import { BillingType } from "../interfaces/BillingType";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: BillingType, default: BillingType.NONBILLABLE })
  billingType!: BillingType;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  endDate?: Date;

  // Task is assigned to members
  @ManyToMany(() => User)
  @JoinTable()
  members?: User[];

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  project!: Project;

  @Column()
  projectId!: number;

  @Column({ nullable: true })
  startDate?: Date;

  @Column()
  title!: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  // owner of task
  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  user?: User;

  @Column({ nullable: true })
  userId?: number;
}

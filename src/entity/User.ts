import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../interfaces/UserRole";
import { UserStatus } from "../interfaces/UserStatus";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  googleId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.NORMAL })
  role!: UserRole;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

import { IRole } from "@valkyrix/domain-interfaces";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column({nullable: true})
  description?: string | undefined;
  
  @VersionColumn()
  version!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date | undefined;
}
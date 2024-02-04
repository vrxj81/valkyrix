import { IPermission } from "@valkyrix/domain-interfaces";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission implements IPermission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column({nullable: true})
  description?: string | undefined;

  @Column()
  action!: string;

  @Column()
  subject!: string;

  @Column({type: 'json', nullable: true})
  conditions?: object | undefined;

  @Column()
  version!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date | undefined;
}
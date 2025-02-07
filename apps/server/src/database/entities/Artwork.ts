import { ARTWORK_TYPES } from "@art-gallery/shared";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 99 })
  public title!: string;

  @Column({ type: "varchar", length: 50 })
  public artist!: string;

  @Column({
    type: "enum",
    enum: ARTWORK_TYPES,
  })
  public type!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price!: number;

  @Column({ type: "boolean", nullable: true })
  public availability?: boolean | null;

  @CreateDateColumn({ type: "timestamp" })
  public created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updated_at!: Date;
}

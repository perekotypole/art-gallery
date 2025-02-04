import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class ArtworkEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 99 })
  public title!: string;

  @Column({ type: "varchar", length: 50 })
  public artist!: string;

  @Column({ type: "varchar", length: 50 })
  public type!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public price!: number;

  @Column({ type: "boolean", default: true })
  public availability!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  public created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updated_at!: Date;
}

export { ArtworkEntity };

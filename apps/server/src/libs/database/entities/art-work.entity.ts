import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Artwork {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "varchar", length: 255 })
  public title!: string;

  @Column({ type: "varchar", length: 255 })
  public artist!: string;

  @Column({ type: "varchar", length: 100 })
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

export { Artwork };

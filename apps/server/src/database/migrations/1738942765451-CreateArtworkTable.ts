import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArtworkTable1738942765451 implements MigrationInterface {
  name = "CreateArtworkTable1738942765451";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."artwork_type_enum" AS ENUM('painting', 'sculpture')`,
    );
    await queryRunner.query(
      `CREATE TABLE "artwork" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(99) NOT NULL, "artist" character varying(50) NOT NULL, "type" "public"."artwork_type_enum" NOT NULL, "price" numeric(10,2) NOT NULL, "availability" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee2e7c5ad7226179d4113a96fa8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artwork"`);
    await queryRunner.query(`DROP TYPE "public"."artwork_type_enum"`);
  }
}

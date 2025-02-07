import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertMockArtworks1738943215409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "artwork" 
            ("title", "artist", "type", "price", "availability") 
            VALUES 
            ('Starry Night', 'Vincent van Gogh', 'painting', 89.99, true),
            ('The Thinker', 'Auguste Rodin', 'sculpture', 249.50, false),
            ('Mona Lisa Replica', 'Leonardo da Vinci Workshop', 'painting', 129.99, true)
        `);

    await queryRunner.query(`
            INSERT INTO "artwork" 
            ("title", "artist", "type", "price") 
            VALUES 
            ('Abstract Dancer', 'Modern Art Studios', 'sculpture', 199.75)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "artwork" 
            WHERE title IN ('Starry Night', 'The Thinker', 'Mona Lisa Replica', 'Abstract Dancer')
        `);
  }
}

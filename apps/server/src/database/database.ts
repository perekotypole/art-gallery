import "reflect-metadata";
import { DataSource } from "typeorm";

const database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "artgallery",
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  synchronize: false,
});

export default database;

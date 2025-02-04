import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const VALID_DB_TYPES = [
  "mysql",
  "postgres",
  "mariadb",
  "sqlite",
  "mssql",
  "mongodb",
] as const;
type DatabaseType = (typeof VALID_DB_TYPES)[number];

if (
  !process.env.DB_TYPE ||
  !VALID_DB_TYPES.includes(process.env.DB_TYPE as DatabaseType)
) {
  throw new Error(
    `Invalid DB_TYPE. Must be one of: ${VALID_DB_TYPES.join(", ")}`,
  );
}

const database = new DataSource({
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
});

export { database };

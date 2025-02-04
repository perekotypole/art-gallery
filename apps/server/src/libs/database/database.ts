import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { Artwork } from "./entities/art-work.entity.js";

dotenv.config();

const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Artwork],
});

export { database };

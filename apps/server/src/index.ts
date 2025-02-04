import express from "express";
import dotenv from "dotenv";

import { database } from "./libs/database/database.js";
import { logger, LoggerEntity } from "./libs/logger/logger.js";

dotenv.config();

database
  .initialize()
  .then(() => {
    logger.info(LoggerEntity.DATABASE, "Data Source has been initialized!");
  })
  .catch((err: unknown) => {
    logger.error(
      LoggerEntity.DATABASE,
      `Error during Data Source initialization: ${err as Error}`,
    );
  });

const app = express();
const port = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, (error) => {
  if (!error) {
    logger.info(
      LoggerEntity.SERVER,
      `Server is running at http://localhost:${port}`,
    );
  } else {
    logger.error(LoggerEntity.SERVER, error.message);
  }
});

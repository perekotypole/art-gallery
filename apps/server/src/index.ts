import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { database } from "~/libs/database/database.js";
import { logger, LoggerEntity } from "~/libs/logger/logger.js";
import { artworksController } from "~/modules/modules.js";

dotenv.config();

try {
  await database.initialize();
  logger.info(LoggerEntity.DATABASE, "Data Source has been initialized!");
} catch (error) {
  logger.error(
    LoggerEntity.DATABASE,
    `Error during Data Source initialization: ${error as Error}`,
  );

  process.exit();
}

const app = express();

const port = process.env.PORT;
const allowedUrl = process.env.ALLOWED_URL;

app.use(cors({ origin: allowedUrl }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "alive",
  });
});

app.use(artworksController);

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

import type { Logger } from "./types/types.js";

class BaseLogger {
  private logger: Console;

  public constructor() {
    this.logger = console;
  }

  public debug: Logger["debug"] = (entity, message) => {
    this.logger.debug(`[${entity}]: ${message}`);
  };

  public error: Logger["error"] = (entity, message) => {
    this.logger.error(`[${entity}]: ${message}`);
  };

  public info: Logger["info"] = (entity, message) => {
    this.logger.info(`[${entity}]: ${message}`);
  };

  public warn: Logger["warn"] = (entity, message) => {
    this.logger.warn(`[${entity}]: ${message}`);
  };
}

const logger = new BaseLogger();

export * from "./enums/enums.js";
export type * from "./types/types.js";

export { logger };

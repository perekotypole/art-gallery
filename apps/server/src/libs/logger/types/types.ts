import { type LoggerEntity } from "../enums/enums.js";

type LoggerEntityValue = (typeof LoggerEntity)[keyof typeof LoggerEntity];

type LogFunction = (entity: LoggerEntityValue, message: string) => void;

type Logger = {
  debug: LogFunction;
  error: LogFunction;
  info: LogFunction;
  warn: LogFunction;
};

export type { LogFunction, Logger, LoggerEntityValue };

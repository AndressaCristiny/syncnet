import chalk from "chalk";
import { Logger } from "../models/logger.model";
import MongoDBService from "@services/database.service";

const logger: Logger = {
  sucess: (message: string): void => {
    const date = new Date();
    const logMessage = `[SUCESS] ${date.toISOString()} - ${message}`;
    console.log(chalk.green(logMessage));

    MongoDBService.saveLog({
      level: "SUCESS",
      message: message,
      timestamp: date,
    });
  },

  error: (message: string): void => {
    const date = new Date();

    const logMessage = `[ERROR] ${date.toISOString()} - ${message}`;
    console.error(chalk.red(logMessage));

    MongoDBService.saveLog({
      level: "ERROR",
      message: message,
      timestamp: date,
    });
  },

  info: (message: string): void => {
    const date = new Date();

    const logMessage = `[INFO] ${date.toISOString()} - ${message}`;
    console.log(chalk.blue(logMessage));

    MongoDBService.saveLog({
      level: "INFO",
      message: message,
      timestamp: date,
    });
  },

  warn: (message: string): void => {
    const date = new Date();

    const logMessage = `[WARN] ${date.toISOString()} - ${message}`;
    console.warn(chalk.yellow(logMessage));

    MongoDBService.saveLog({
      level: "WARN",
      message: message,
      timestamp: date,
    });
  },
};

export default logger;

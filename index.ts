import { startSyncJob } from "./src/jobs/syncJob";
import connectToDatabaseMongo from "./src/config/database-mongo.config";
import { logger } from "./src/utils";
import dotenv from "dotenv";
dotenv.config();

const startApp = async () => {
  try {
    await connectToDatabaseMongo();
    logger.info("Conectado ao banco de dados MongoDB.");

    logger.info("Inicializando aplicação OZmap Sync (SyncNet)...");

    startSyncJob();

    logger.info("Aplicação iniciada com sucesso.");
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      logger.error(`Erro ao iniciar aplicação - ${error.message}`);
    } else {
      logger.error("Ocorreu um erro desconhecido ao iniciar a aplicação.");
    }
  }
};

startApp();

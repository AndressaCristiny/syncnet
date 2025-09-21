import cron, { ScheduledTask } from "node-cron";
import { logger } from "@utils";
import syncService from "@services/sync.service";

const syncData = async () => {
  try {
    logger.info("Iniciando sincronização de dados do ISP...");

    logger.info("Iniciando sincronização de dados do ISP para o OZmap...");

    await syncService.syncData();

    logger.info("Sincronização concluída com sucesso!");
  } catch (error: unknown) {
    logger.error(`Erro durante a sincronização - ${error as Error}.`);
  }
};

let job: ScheduledTask;

const startSyncJob = () => {
  job = cron.schedule("* * * * *", async () => {
    await syncData();
  });
};

const stopSyncJob = () => {
  if (job) {
    job.stop();
  }
};

export { startSyncJob, stopSyncJob, syncData };

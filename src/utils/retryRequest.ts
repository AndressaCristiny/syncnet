import logger from "./logger";
import delay from "./delay";

// Função para gerenciar tentativas em caso de falha temporária
const retryRequest = async (
  fn: () => Promise<any>,
  retries: number = 3,
  nameFunction: string = ""
): Promise<any> => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      const result = await fn();

      if (attempts > 0) {
        logger.info(
          `[${nameFunction}] Tentativa ${attempts + 1} bem-sucedida.`
        );
      }

      return result;
    } catch (error) {
      attempts++;

      if (attempts >= retries) {
        logger.error(
          `[${nameFunction}] Falha após ${retries} tentativas: ${error}`
        );
        throw error;
      }

      logger.warn(
        `[${nameFunction}] Tentativa ${attempts} falhou, tentando novamente...`
      );

      await delay(2000);
    }
  }
};

export default retryRequest;

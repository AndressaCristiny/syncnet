import axios, { AxiosError } from "axios";
import logger from "./logger";

const handleError = (error: AxiosError, source: string): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      logger.error(
        `[${source}] Erro: ${error.response.status} - ${
          error.response.statusText
        } | Detalhes: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      logger.error(`[${source}] Erro de rede: ${error.message}`);
    } else {
      logger.error(`[${source}] Erro inesperado: ${error.message}`);
    }
  } else {
    logger.error(`[${source}] Erro desconhecido: ${error}`);
  }
};

export default handleError;

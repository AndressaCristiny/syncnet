import sdk from "@config/ozmap-sdk.config";
import { UpdateFTTHClientDTO } from "@ozmap/ozmap-sdk";
import { handleError, logger } from "@utils";
import { AxiosError } from "axios";

export const updateClient = async (client: UpdateFTTHClientDTO) => {
  try {
    logger.info(
      `[updateClient] Iniciando atualização para o client com external_id: ${client.external_id}`
    );

    sdk.ftthClient.updateById(client.external_id, client).then(() => {
      console.log("client updated");
    });

    logger.sucess(
      `[updateClient] Atualização bem-sucedida para o client com external_id: ${client.external_id}`
    );
  } catch (error: any) {
    handleError(error as AxiosError, "updateClient");
    logger.error(
      `Erro ao executar updateClient para o client com external_id: ${client.external_id}. Erro: ${error.message}`
    );
    return;
  }
};

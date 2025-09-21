import sdk from "@config/ozmap-sdk.config";
import { UpdateBoxDTO } from "@ozmap/ozmap-sdk";
import { handleError, logger } from "@utils";
import { AxiosError } from "axios";

export const updateBox = async (box: UpdateBoxDTO) => {
  try {
    logger.info(
      `[updateBox] Iniciando atualização para o box com external_id: ${box.external_id}`
    );

    sdk.box.updateById(box.external_id, box);

    logger.sucess(
      `[updateBox] Atualização bem-sucedida para o box com external_id: ${box.external_id}`
    );
  } catch (error: any) {
    handleError(error as AxiosError, "updateBox");
    logger.error(
      `Erro ao executar updateBox para o box com external_id: ${box.external_id}. Erro: ${error.message}`
    );
    return;
  }
};

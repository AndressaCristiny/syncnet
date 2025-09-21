import sdk from "@config/ozmap-sdk.config";
import { UpdateCableDTO } from "@ozmap/ozmap-sdk";
import { handleError, logger } from "@utils";
import { AxiosError } from "axios";

export const updateCable = async (cable: UpdateCableDTO) => {
  try {
    logger.info(
      `[updatecable] Iniciando atualização para o cable com external_id: ${cable.external_id}`
    );

    sdk.cable.updateById(cable.external_id, cable).then(() => {
      console.log("cable updated");
    });

    logger.sucess(
      `[updatecable] Atualização bem-sucedida para o cable com external_id: ${cable.external_id}`
    );
  } catch (error: any) {
    handleError(error as AxiosError, "updatecable");
    logger.error(
      `Erro ao executar updatecable para o cable com external_id: ${cable.external_id}. Erro: ${error.message}`
    );
    return;
  }
};

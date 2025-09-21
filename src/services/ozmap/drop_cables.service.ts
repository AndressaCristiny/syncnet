import sdk from "@config/ozmap-sdk.config";
import { UpdateConnectorTypeDTO } from "@ozmap/ozmap-sdk";
import { handleError, logger } from "@utils";
import { AxiosError } from "axios";

export const updateConnectorType = async (
  dropCable: UpdateConnectorTypeDTO
) => {
  try {
    logger.info(
      `[updateConnectorType] Iniciando atualização para o dropCable com external_id: ${dropCable.external_id}`
    );

    sdk.connectorType.updateById(dropCable.external_id, dropCable).then(() => {
      console.log("dropCable updated");
    });

    logger.sucess(
      `[updateConnectorType] Atualização bem-sucedida para o dropCable com external_id: ${dropCable.external_id}`
    );
  } catch (error: any) {
    handleError(error as AxiosError, "updateConnectorType");
    logger.error(
      `Erro ao executar updateConnectorType para o dropCable com external_id: ${dropCable.external_id}. Erro: ${error.message}`
    );
    return;
  }
};

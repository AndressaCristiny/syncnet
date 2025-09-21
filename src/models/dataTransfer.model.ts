import {
  UpdateFTTHClientDTO,
  UpdateCableDTO,
  UpdateBoxDTO,
  UpdateConnectorTypeDTO,
} from "@ozmap/ozmap-sdk";

export interface UpdateDataTransfer {
  ftthClients: UpdateFTTHClientDTO[];
  cables: UpdateCableDTO[];
  boxes: UpdateBoxDTO[];
  connectorTypes: UpdateConnectorTypeDTO[];
}

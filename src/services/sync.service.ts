import IspService from "@services/isp.service";
import { logger, transformToOZMapData, retryRequest } from "@utils";
import { IspData } from "@models/isp.model";
import { UpdateDataTransfer } from "@models/dataTransfer.model";
import { updateConnectorType } from "@services/ozmap/drop_cables.service";
import { updateBox } from "@services/ozmap/box.service";
import { updateCable } from "@services/ozmap/cable.service";
import { updateClient } from "@services/ozmap/customers.service";
import MongoDBService from "@services/database.service";

class SyncService {
  public async syncData() {
    const data = await this.getData();
    const dataFormatedOZmap = await this.transformDataForOZmap(data);
    const env_OZmap = await this.sendToOZmap(dataFormatedOZmap);
    if (env_OZmap) {
      await this.saveToDatabase(dataFormatedOZmap);
    } else {
      logger.error("Erro ao sincronizar dados com OZmap");
    }
  }
  private async getData(): Promise<IspData> {
    try {
      logger.info("Buscando dados do ISP...");
      const cables = await IspService.getCables();
      const dropCables = await IspService.getDropCables();
      const boxes = await IspService.getBoxes();
      const customers = await IspService.getCustomers();
      logger.sucess("Dados buscados com sucesso!");

      return { cables, dropCables, boxes, customers };
    } catch (error) {
      logger.error(`Erro durante a sincronização - ${error}`);
      return { cables: [], dropCables: [], boxes: [], customers: [] };
    }
  }

  private async transformDataForOZmap(
    ispData: IspData
  ): Promise<UpdateDataTransfer> {
    try {
      logger.info("Transformando dados para OZmap...");

      const dataBox = transformToOZMapData.transformBoxes(ispData.boxes);
      const dataCable = transformToOZMapData.transformCables(ispData.cables);
      const dataCustomer = transformToOZMapData.transformCustomers(
        ispData.customers
      );
      const dataDropCable = transformToOZMapData.transformDropCables(
        ispData.dropCables
      );

      logger.sucess("Dados transformados com sucesso!");

      return {
        cables: dataCable,
        connectorTypes: dataDropCable,
        boxes: dataBox,
        ftthClients: dataCustomer,
      };
    } catch (error) {
      logger.error(`Erro ao transformar dados - ${error}`);
      return { cables: [], connectorTypes: [], boxes: [], ftthClients: [] };
    }
  }

  private async sendToOZmap(data: UpdateDataTransfer): Promise<boolean> {
    try {
      logger.info("Enviando dados para OZmap...");

      await Promise.all([
        this.processRequest(data.boxes, updateBox),
        this.processRequest(data.connectorTypes, updateConnectorType),
        this.processRequest(data.cables, updateCable),
        this.processRequest(data.ftthClients, updateClient),
      ]);

      logger.sucess("Dados enviados com sucesso para OZmap!");

      return true;
    } catch (error) {
      logger.error(`Erro ao enviar dados para OZmap - ${error}`);
      return false;
    }
  }

  private async saveToDatabase(data: UpdateDataTransfer): Promise<boolean> {
    try {
      logger.info("Salvando dados no banco de dados...");

      await Promise.all([
        this.processRequest(data.boxes, MongoDBService.saveBoxes),
        this.processRequest(data.connectorTypes, MongoDBService.saveDropCables),
        this.processRequest(data.cables, MongoDBService.saveCables),
        this.processRequest(data.ftthClients, MongoDBService.saveCustomers),
      ]);

      logger.sucess("Dados salvos com sucesso no banco de dados.");
      return true;
    } catch (error) {
      logger.error(`Erro ao salvar dados no banco de dados - ${error}`);
      return false;
    }
  }

  private processRequest = async (items: any[], updateFn: Function) => {
    items.map(async (item: any) => {
      await retryRequest(() => updateFn(item), 5, "processRequest");
    });
  };
}

export default new SyncService();

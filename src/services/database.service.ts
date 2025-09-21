import mongoose from "mongoose";
import Log from "../models/log.model";
import DropCable from "../models/dropCable.model";
import Box from "../models/box.model";
import Cable from "../models/cable.model";
import Customer from "../models/customer.model";
import { ILog } from "../models/log.model";
import { DropCable as DropCableType } from "@models/isp.model";
import { Box as BoxType } from "@models/isp.model";
import { Cable as CableType } from "@models/isp.model";
import { Customer as CustomerType } from "@models/isp.model";
import logger from "@utils/logger";

class MongoDBService {
  public async saveLog(log: ILog): Promise<void> {
    try {
      const logEntry = new Log(log);
      await logEntry.save();
    } catch (error) {
      console.error("Erro ao salvar log no MongoDB", error);
    }
  }

  public async saveDropCables(dropCables: DropCableType[]): Promise<void> {
    try {
      await DropCable.insertMany(dropCables);
      logger.sucess("DropCables salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar DropCables:", error);
    }
  }

  public async saveBoxes(boxes: BoxType[]): Promise<void> {
    try {
      await Box.insertMany(boxes);
      logger.sucess("Boxes salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar Boxes:", error);
    }
  }

  public async saveCables(cables: CableType[]): Promise<void> {
    try {
      await Cable.insertMany(cables);
      logger.sucess("Cables salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar Cables:", error);
    }
  }

  public async saveCustomers(customers: CustomerType[]): Promise<void> {
    try {
      await Customer.insertMany(customers);
      logger.sucess("Customers salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar Customers:", error);
    }
  }
}

export default new MongoDBService();

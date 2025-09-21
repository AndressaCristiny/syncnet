import axios, { AxiosError } from "axios";
import { Cable, DropCable, Box, Customer } from "@models/isp.model";
import { handleError, retryRequest } from "@utils";
import dotenv from "dotenv";
dotenv.config();
const env = process.env;

class IspService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.URL_API_ISP || "";
  }

  public async getCables(): Promise<Cable[]> {
    try {
      const response = await retryRequest(
        () => axios.get(`${this.baseUrl}/cables`),
        5,
        "getCables"
      );
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError, "getCables");
      return [];
    }
  }

  public async getDropCables(): Promise<DropCable[]> {
    try {
      const response = await retryRequest(
        () => axios.get(`${this.baseUrl}/drop_cables`),
        5,
        "getDropCables"
      );
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError, "getDropCables");
      return [];
    }
  }

  public async getBoxes(): Promise<Box[]> {
    try {
      const response = await retryRequest(
        () => axios.get(`${this.baseUrl}/boxes`),
        5,
        "getBoxes"
      );
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError, "getBoxes");
      return [];
    }
  }

  public async getCustomers(): Promise<Customer[]> {
    try {
      const response = await retryRequest(
        () => axios.get(`${this.baseUrl}/customers`),
        5,
        "getCustomers"
      );
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError, "getCustomers");
      return [];
    }
  }
}

export default new IspService();

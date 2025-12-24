import axios from "axios";
import { INVENTORY_ENDPOINTS } from "../constants/api-routes";
import { mapMessage } from "../constants/message-mapper";

export const inventoryRepository = {
  getAll: async () => {
    try {
      const response = await axios.get(INVENTORY_ENDPOINTS.GET_ALL);
      return {
        success: true,
        data: response.data,
        message: mapMessage("SUCCESS"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("SOMETHING_WENT_WRONG"),
        error: error.message,
      };
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(INVENTORY_ENDPOINTS.GET_BY_ID(id));
      return {
        success: true,
        data: response.data,
        message: mapMessage("SUCCESS"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("INVENTORY_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  create: async (inventoryData) => {
    try {
      const response = await axios.post(
        INVENTORY_ENDPOINTS.CREATE,
        inventoryData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("INVENTORY_CREATED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("INVALID_INPUT"),
        error: error.message,
      };
    }
  },

  update: async (id, inventoryData) => {
    try {
      const response = await axios.put(
        INVENTORY_ENDPOINTS.UPDATE(id),
        inventoryData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("INVENTORY_UPDATED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("INVENTORY_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(INVENTORY_ENDPOINTS.DELETE(id));
      return {
        success: true,
        data: null,
        message: mapMessage("INVENTORY_DELETED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("INVENTORY_NOT_FOUND"),
        error: error.message,
      };
    }
  },
};

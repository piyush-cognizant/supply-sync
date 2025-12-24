import axios from "axios";
import { PURCHASE_ENDPOINTS } from "../constants/api-routes";
import { mapMessage } from "../constants/message-mapper";

export const purchaseRepository = {
  getAll: async () => {
    try {
      const response = await axios.get(PURCHASE_ENDPOINTS.GET_ALL);
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
      const response = await axios.get(PURCHASE_ENDPOINTS.GET_BY_ID(id));
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
        message: mapMessage("PURCHASE_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  create: async (purchaseData) => {
    try {
      const response = await axios.post(
        PURCHASE_ENDPOINTS.CREATE,
        purchaseData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("PURCHASE_CREATED"),
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

  update: async (id, purchaseData) => {
    try {
      const response = await axios.put(
        PURCHASE_ENDPOINTS.UPDATE(id),
        purchaseData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("PURCHASE_UPDATED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("PURCHASE_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(PURCHASE_ENDPOINTS.DELETE(id));
      return {
        success: true,
        data: null,
        message: mapMessage("PURCHASE_DELETED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("PURCHASE_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  filterByStatus: async (status) => {
    try {
      const response = await axios.get(
        PURCHASE_ENDPOINTS.FILTER_BY_STATUS(status)
      );
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
};

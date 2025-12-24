import axios from "axios";
import { ORDER_ENDPOINTS } from "../constants/api-routes";
import { mapMessage } from "../constants/message-mapper";

export const orderRepository = {
  getAll: async () => {
    try {
      const response = await axios.get(ORDER_ENDPOINTS.GET_ALL);
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
      const response = await axios.get(ORDER_ENDPOINTS.GET_BY_ID(id));
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
        message: mapMessage("ORDER_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  create: async (orderData) => {
    try {
      const response = await axios.post(ORDER_ENDPOINTS.CREATE, orderData);
      return {
        success: true,
        data: response.data,
        message: mapMessage("ORDER_CREATED"),
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

  update: async (id, orderData) => {
    try {
      const response = await axios.put(ORDER_ENDPOINTS.UPDATE(id), orderData);
      return {
        success: true,
        data: response.data,
        message: mapMessage("ORDER_UPDATED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("ORDER_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(ORDER_ENDPOINTS.DELETE(id));
      return {
        success: true,
        data: null,
        message: mapMessage("ORDER_DELETED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("ORDER_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  filterByStatus: async (status) => {
    try {
      const response = await axios.get(
        ORDER_ENDPOINTS.FILTER_BY_STATUS(status)
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

  filterByVendor: async (vendorId) => {
    try {
      const response = await axios.get(
        ORDER_ENDPOINTS.FILTER_BY_VENDOR(vendorId)
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

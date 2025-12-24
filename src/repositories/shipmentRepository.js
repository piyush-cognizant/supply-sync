import axios from "axios";
import { SHIPMENT_ENDPOINTS } from "../constants/api-routes";
import { mapMessage } from "../constants/message-mapper";

export const shipmentRepository = {
  getAll: async () => {
    try {
      const response = await axios.get(SHIPMENT_ENDPOINTS.GET_ALL);
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
      const response = await axios.get(SHIPMENT_ENDPOINTS.GET_BY_ID(id));
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
        message: mapMessage("SHIPMENT_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  create: async (shipmentData) => {
    try {
      const response = await axios.post(
        SHIPMENT_ENDPOINTS.CREATE,
        shipmentData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("SHIPMENT_CREATED"),
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

  update: async (id, shipmentData) => {
    try {
      const response = await axios.put(
        SHIPMENT_ENDPOINTS.UPDATE(id),
        shipmentData
      );
      return {
        success: true,
        data: response.data,
        message: mapMessage("SHIPMENT_UPDATED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("SHIPMENT_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(SHIPMENT_ENDPOINTS.DELETE(id));
      return {
        success: true,
        data: null,
        message: mapMessage("SHIPMENT_DELETED"),
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage("SHIPMENT_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  track: async (trackingNumber) => {
    try {
      const response = await axios.get(SHIPMENT_ENDPOINTS.TRACK(trackingNumber));
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
        message: mapMessage("SHIPMENT_NOT_FOUND"),
        error: error.message,
      };
    }
  },

  filterByStatus: async (status) => {
    try {
      const response = await axios.get(
        SHIPMENT_ENDPOINTS.FILTER_BY_STATUS(status)
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

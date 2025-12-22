// API Routes Configuration
// Base URL for backend (using JSON Server or mock API)
export const API_BASE_URL = "http://localhost:3001";

// Vendor Endpoints
export const VENDOR_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/vendors`,
  GET_BY_ID: (id) => `${API_BASE_URL}/vendors/${id}`,
  CREATE: `${API_BASE_URL}/vendors`,
  UPDATE: (id) => `${API_BASE_URL}/vendors/${id}`,
  DELETE: (id) => `${API_BASE_URL}/vendors/${id}`,
  SEARCH: `${API_BASE_URL}/vendors?q=`,
};

// Order Endpoints
export const ORDER_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/orders`,
  GET_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
  CREATE: `${API_BASE_URL}/orders`,
  UPDATE: (id) => `${API_BASE_URL}/orders/${id}`,
  DELETE: (id) => `${API_BASE_URL}/orders/${id}`,
  FILTER_BY_STATUS: (status) => `${API_BASE_URL}/orders?status=${status}`,
  FILTER_BY_VENDOR: (vendorId) => `${API_BASE_URL}/orders?vendorId=${vendorId}`,
};

// Inventory Endpoints
export const INVENTORY_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/inventory`,
  GET_BY_ID: (id) => `${API_BASE_URL}/inventory/${id}`,
  CREATE: `${API_BASE_URL}/inventory`,
  UPDATE: (id) => `${API_BASE_URL}/inventory/${id}`,
  DELETE: (id) => `${API_BASE_URL}/inventory/${id}`,
  LOW_STOCK: `${API_BASE_URL}/inventory?stock=low`,
};

// Shipment Endpoints
export const SHIPMENT_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/shipments`,
  GET_BY_ID: (id) => `${API_BASE_URL}/shipments/${id}`,
  CREATE: `${API_BASE_URL}/shipments`,
  UPDATE: (id) => `${API_BASE_URL}/shipments/${id}`,
  DELETE: (id) => `${API_BASE_URL}/shipments/${id}`,
  TRACK: (trackingNumber) => `${API_BASE_URL}/shipments?tracking=${trackingNumber}`,
  FILTER_BY_STATUS: (status) => `${API_BASE_URL}/shipments?status=${status}`,
};

// Purchase Endpoints
export const PURCHASE_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/purchases`,
  GET_BY_ID: (id) => `${API_BASE_URL}/purchases/${id}`,
  CREATE: `${API_BASE_URL}/purchases`,
  UPDATE: (id) => `${API_BASE_URL}/purchases/${id}`,
  DELETE: (id) => `${API_BASE_URL}/purchases/${id}`,
  FILTER_BY_STATUS: (status) => `${API_BASE_URL}/purchases?status=${status}`,
};

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
  GET_DASHBOARD: `${API_BASE_URL}/analytics/dashboard`,
  GET_METRICS: `${API_BASE_URL}/analytics/metrics`,
};

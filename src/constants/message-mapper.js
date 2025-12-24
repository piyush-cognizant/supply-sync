// Message mapping from backend codes to user-facing messages
export const MESSAGE_MAPPER = {
  // Vendor Messages
  VENDOR_NOT_FOUND: "Vendor not found",
  VENDOR_CREATED: "Vendor created successfully",
  VENDOR_UPDATED: "Vendor updated successfully",
  VENDOR_DELETED: "Vendor deleted successfully",

  // Order Messages
  ORDER_NOT_FOUND: "Order not found",
  ORDER_CREATED: "Order created successfully",
  ORDER_UPDATED: "Order updated successfully",
  INVALID_ORDER_STATUS: "Invalid order status",

  // Inventory Messages
  INVENTORY_NOT_FOUND: "Inventory item not found",
  INVENTORY_CREATED: "Inventory item created successfully",
  INVENTORY_UPDATED: "Inventory updated successfully",
  INSUFFICIENT_STOCK: "Insufficient stock available",

  // Shipment Messages
  SHIPMENT_NOT_FOUND: "Shipment not found",
  SHIPMENT_CREATED: "Shipment created successfully",
  SHIPMENT_UPDATED: "Shipment updated successfully",

  // Purchase Messages
  PURCHASE_NOT_FOUND: "Purchase not found",
  PURCHASE_CREATED: "Purchase created successfully",
  PURCHASE_UPDATED: "Purchase updated successfully",

  // Generic Messages
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  INVALID_INPUT: "Invalid input provided",
  SUCCESS: "Operation completed successfully",
};

export const mapMessage = (backendMessage) => {
  return MESSAGE_MAPPER[backendMessage] || backendMessage;
};

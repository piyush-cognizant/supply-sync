# SupplySync - Low Level Design (LLD)

## System Overview
SupplySync is a supply chain management and vendor management platform that handles orders, inventory, shipments, purchases, and vendor relationships.

---

## Architecture Flow

**Current (Phase 1):**
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Component                   │
│              (React Component with useState)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Repository Layer (Axios)                   │
│        Handles all API calls to backend                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Message Mapper (Constants)                 │
│   Backend Message: USER_NOT_FOUND                       │
│   ↓ Mapper Maps to ↓                                    │
│   User Facing: "User not found"                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Backend API (JSON Server)                  │
│              Port 3001                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Database (db.json)                         │
│      - Vendors, Orders, Inventory, Shipments, etc.      │
└─────────────────────────────────────────────────────────┘
```

**Future (Phase 2):**
```
Component → React Query Hook → Repository Method
                                      ↓
                        API Request Builder Util
                        API Response Parser Util
                                      ↓
                                    Axios
```

---

## API Response Format

**All API responses follow this consistent format:**

```javascript
{
  success: boolean,          // true or false
  data: object | array,      // Actual data on success, null on failure
  message: string,           // User-facing message
  error: null | string       // null on success, error details on failure
}
```

### Success Response Example:
```javascript
{
  success: true,
  data: { id: 1, name: "Vendor Name", ... },
  message: "Vendor created successfully",
  error: null
}
```

### Error Response Example (from Backend):
```javascript
{
  success: false,
  data: null,
  message: "VENDOR_NOT_FOUND",        // Backend code
  error: "Vendor with ID 1 not found"
}
```

After Mapper:
```javascript
{
  success: false,
  data: null,
  message: "Vendor not found",        // User-facing message
  error: "Vendor with ID 1 not found"
}
```

---

## Message Mapping

**Constants file:** `src/constants/message-mapper.js`

```javascript
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
  INVENTORY_UPDATED: "Inventory updated successfully",
  INSUFFICIENT_STOCK: "Insufficient stock available",
  
  // Generic Messages
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  INVALID_INPUT: "Invalid input provided",
};

export const mapMessage = (backendMessage) => {
  return MESSAGE_MAPPER[backendMessage] || backendMessage;
};
```

---

## Repository Pattern

**Structure:** `src/repositories/`

### Example: Vendor Repository

```javascript
// src/repositories/vendorRepository.js
import axios from 'axios';
import { VENDOR_ENDPOINTS } from '../constants/api-routes';
import { mapMessage } from '../constants/message-mapper';

export const vendorRepository = {
  // Get all vendors
  getAll: async () => {
    try {
      const response = await axios.get(VENDOR_ENDPOINTS.GET_ALL);
      return {
        success: response.data.success,
        data: response.data.data,
        message: mapMessage(response.data.message),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage('SOMETHING_WENT_WRONG'),
        error: error.message
      };
    }
  },

  // Get vendor by ID
  getById: async (id) => {
    try {
      const response = await axios.get(VENDOR_ENDPOINTS.GET_BY_ID(id));
      return {
        success: response.data.success,
        data: response.data.data,
        message: mapMessage(response.data.message),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage('VENDOR_NOT_FOUND'),
        error: error.message
      };
    }
  },

  // Create vendor
  create: async (vendorData) => {
    try {
      const response = await axios.post(VENDOR_ENDPOINTS.CREATE, vendorData);
      return {
        success: response.data.success,
        data: response.data.data,
        message: mapMessage(response.data.message),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage('INVALID_INPUT'),
        error: error.message
      };
    }
  },

  // Update vendor
  update: async (id, vendorData) => {
    try {
      const response = await axios.put(VENDOR_ENDPOINTS.UPDATE(id), vendorData);
      return {
        success: response.data.success,
        data: response.data.data,
        message: mapMessage(response.data.message),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage('VENDOR_NOT_FOUND'),
        error: error.message
      };
    }
  },

  // Delete vendor
  delete: async (id) => {
    try {
      const response = await axios.delete(VENDOR_ENDPOINTS.DELETE(id));
      return {
        success: response.data.success,
        data: response.data.data,
        message: mapMessage(response.data.message),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: mapMessage('VENDOR_NOT_FOUND'),
        error: error.message
      };
    }
  }
};
```

Similar repositories for Orders, Inventory, Shipments, Purchases, and Analytics.

---

## Component Usage Pattern

**Example: Vendor List Component**

```javascript
import { useState, useEffect } from 'react';
import { vendorRepository } from '../repositories/vendorRepository';

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    
    const response = await vendorRepository.getAll();
    
    if (response.success) {
      setVendors(response.data);
    } else {
      setError(response.message); // User-facing message
    }
    
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      {vendors.map(vendor => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};
```

---

## Core Modules

### 1. **Vendor Management**
- **Purpose**: Manage vendor/supplier information
- **Data**: Name, Email, Phone, Address, Category, Rating, Status
- **Operations**: CRUD, Search, Filter by status
- **Routes**: `/vendors`

### 2. **Order Management**
- **Purpose**: Create and track purchase orders
- **Data**: Order ID, Vendor ID, Items, Total Amount, Status, Payment Status
- **Operations**: CRUD, Filter by status/vendor, Update order status
- **Routes**: `/orders`

### 3. **Inventory Management**
- **Purpose**: Track stock levels and product information
- **Data**: SKU, Product Name, Quantity, Min/Max Stock, Unit Price, Location
- **Operations**: CRUD, Check low stock items, Update quantities
- **Routes**: `/inventory`

### 4. **Shipment Tracking**
- **Purpose**: Monitor shipments and deliveries
- **Data**: Tracking Number, Carrier, Status, Origin, Destination, Dates
- **Operations**: CRUD, Track by number, Filter by status
- **Routes**: `/shipments`

### 5. **Purchase Management**
- **Purpose**: Record and track purchases
- **Data**: Purchase ID, Order ID, Vendor ID, Amount, Status
- **Operations**: CRUD, Filter by status
- **Routes**: `/purchases`

### 6. **Analytics Dashboard**
- **Purpose**: Display KPIs and metrics
- **Data**: Total orders, order value, vendor performance, revenue trends
- **Operations**: GET dashboard metrics, GET monthly analytics
- **Routes**: `/analytics`

---

## Data Models

### Vendor
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string,
  category: string,
  rating: number (0-5),
  status: 'active' | 'inactive' | 'suspended',
  createdAt: date
}
```

### Order
```javascript
{
  id: string,
  vendorId: number,
  orderDate: date,
  dueDate: date,
  items: [
    {
      id: number,
      name: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number
    }
  ],
  totalAmount: number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentStatus: 'unpaid' | 'partial' | 'paid'
}
```

### Inventory Item
```javascript
{
  id: string,
  productName: string,
  sku: string,
  category: string,
  quantity: number,
  minStock: number,
  maxStock: number,
  unitPrice: number,
  warehouseLocation: string,
  lastUpdated: date
}
```

### Shipment
```javascript
{
  id: string,
  orderId: string,
  vendorId: number,
  shippingDate: date,
  estimatedDelivery: date,
  actualDelivery: date | null,
  trackingNumber: string,
  carrier: string,
  status: 'pending' | 'in-transit' | 'delivered' | 'failed',
  items: number,
  origin: string,
  destination: string
}
```

### Purchase
```javascript
{
  id: string,
  orderId: string,
  vendorId: number,
  purchaseDate: date,
  totalAmount: number,
  status: 'pending' | 'completed' | 'cancelled',
  items: number,
  notes: string
}
```

---

## API Endpoints

### Vendors
- `GET /vendors` - Get all vendors
- `GET /vendors/:id` - Get vendor by ID
- `POST /vendors` - Create new vendor
- `PUT /vendors/:id` - Update vendor
- `DELETE /vendors/:id` - Delete vendor

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `GET /orders?status=:status` - Filter by status
- `GET /orders?vendorId=:vendorId` - Filter by vendor

### Inventory
- `GET /inventory` - Get all inventory items
- `GET /inventory/:id` - Get item by ID
- `POST /inventory` - Create item
- `PUT /inventory/:id` - Update item
- `DELETE /inventory/:id` - Delete item

### Shipments
- `GET /shipments` - Get all shipments
- `GET /shipments/:id` - Get shipment by ID
- `POST /shipments` - Create shipment
- `PUT /shipments/:id` - Update shipment
- `DELETE /shipments/:id` - Delete shipment
- `GET /shipments?tracking=:number` - Track shipment

### Purchases
- `GET /purchases` - Get all purchases
- `GET /purchases/:id` - Get purchase by ID
- `POST /purchases` - Create purchase
- `PUT /purchases/:id` - Update purchase
- `DELETE /purchases/:id` - Delete purchase

### Analytics
- `GET /analytics/dashboard` - Get dashboard metrics
- `GET /analytics/metrics` - Get detailed metrics

---

## Frontend Component Structure

```
src/
├── components/
│   ├── layouts/
│   │   └── RootLayout.jsx          // Main layout with sidebar
│   ├── common/
│   │   ├── Sidebar.jsx             // Navigation sidebar
│   │   └── ThemeSwitcher.jsx       // Dark/Light mode toggle
│   └── features/                   // Feature-specific components
│       ├── vendors/
│       ├── orders/
│       ├── inventory/
│       ├── shipments/
│       ├── purchases/
│       └── analytics/
├── pages/
│   ├── Dashboard.jsx
│   ├── OrdersPage.jsx
│   ├── InventoryPage.jsx
│   ├── VendorsPage.jsx
│   ├── ShipmentsPage.jsx
│   ├── PurchasesPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── SettingsPage.jsx
│   └── NotFound.jsx
├── repositories/                   // Repository Pattern (Phase 1)
│   ├── vendorRepository.js
│   ├── orderRepository.js
│   ├── inventoryRepository.js
│   ├── shipmentRepository.js
│   ├── purchaseRepository.js
│   └── analyticsRepository.js
├── hooks/                          // (Future Phase 2: React Query hooks)
│   ├── useVendors.js
│   ├── useOrders.js
│   └── ...
├── utils/                          // (Future Phase 2)
│   ├── apiRequestBuilder.js
│   └── apiResponseParser.js
├── store/
│   └── themeStore.jsx              // Theme management (Zustand)
├── constants/
│   ├── api-routes.js               // API endpoint definitions
│   └── message-mapper.js           // Backend to user message mapping
└── App.jsx
```

---

## Data Flow Example: Creating a Vendor (Phase 1)

**Step-by-step flow:**

1. **User Action** → User submits vendor form
2. **Component** → Calls `vendorRepository.create(vendorData)`
3. **Repository** → Sends POST request to backend via Axios
4. **Backend** → JSON Server receives, validates, saves to db.json
5. **Response** → Returns standardized response:
   ```javascript
   {
     success: true,
     data: { id: 1, name: "...", ... },
     message: "VENDOR_CREATED",
     error: null
   }
   ```
6. **Message Mapping** → `mapMessage("VENDOR_CREATED")` → "Vendor created successfully"
7. **Component** → Receives response with user-facing message
8. **State Update** → Updates local state with `setVendors([...vendors, response.data])`
9. **UI Update** → Component re-renders with new vendor in list
10. **User Feedback** → Shows success toast/snackbar with user-facing message

---

## Running the Backend (JSON Server)

```bash
# Install JSON Server globally
npm install -g json-server

# Start server on port 3001
json-server --watch db.json --port 3001

# The server will expose all db.json collections as REST API
```

---

## Key Features

✅ **Responsive Design** - Works on desktop and mobile  
✅ **Dark/Light Mode** - Theme persistence with Zustand  
✅ **Repository Pattern** - Centralized API logic (Phase 1)  
✅ **Message Mapping** - Backend codes to user-facing messages  
✅ **Consistent API Response** - Standardized success/error format  
✅ **Navigation** - React Router with active link highlighting  
✅ **Themeable Components** - Using MUI theme system  
✅ **Scalable Architecture** - Easy migration to React Query (Phase 2)

---

## Technology Stack

**Phase 1 (Current):**
- **Frontend**: React 19 + Vite
- **UI Library**: Material-UI (MUI)
- **Icons**: react-icons (Bootstrap Icons)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Styling**: MUI sx prop + CSS
- **Linting**: ESLint

**Phase 2 (Future):**
- **Data Fetching**: React Query (TanStack Query)
- **Request Builder**: Custom utility for request normalization
- **Response Parser**: Custom utility for response transformation

---

## Future Enhancements

- [ ] Authentication & Authorization
- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] File upload for documents
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Multi-warehouse support
- [ ] Real-time notifications (WebSocket)

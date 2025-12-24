import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Alert,
  CircularProgress,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { BiCart } from "react-icons/bi";
import { orderRepository } from "../repositories/orderRepository";
import OrderTable from "../components/features/orders/OrderTable";
import OrderForm from "../components/features/orders/OrderForm";

const OrdersPage = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    const response = await orderRepository.getAll();

    if (response.success) {
      setOrders(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleOpenDialog = (order = null) => {
    setEditingOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingOrder(null);
  };

  const handleSave = async (formData) => {
    if (editingOrder) {
      const response = await orderRepository.update(editingOrder.id, formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchOrders();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    } else {
      const response = await orderRepository.create(formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchOrders();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      const response = await orderRepository.delete(id);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchOrders();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const confirmedOrders = orders.filter((o) => o.status === "confirmed");
  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BiCart style={{ fontSize: "2rem", color: theme.palette.primary.main }} />
          <Box>
            <h2 style={{ margin: 0 }}>Orders Management</h2>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create Order
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} sx={{ mb: 2 }}>
        <Tab label={`All Orders (${orders.length})`} />
        <Tab label={`Pending (${pendingOrders.length})`} />
        <Tab label={`Confirmed (${confirmedOrders.length})`} />
        <Tab label={`Delivered (${deliveredOrders.length})`} />
      </Tabs>

      {tabValue === 0 && (
        <OrderTable orders={orders} onEdit={handleOpenDialog} onDelete={handleDelete} />
      )}
      {tabValue === 1 && (
        <OrderTable orders={pendingOrders} onEdit={handleOpenDialog} onDelete={handleDelete} />
      )}
      {tabValue === 2 && (
        <OrderTable orders={confirmedOrders} onEdit={handleOpenDialog} onDelete={handleDelete} />
      )}
      {tabValue === 3 && (
        <OrderTable orders={deliveredOrders} onEdit={handleOpenDialog} onDelete={handleDelete} />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <OrderForm
          order={editingOrder}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default OrdersPage;

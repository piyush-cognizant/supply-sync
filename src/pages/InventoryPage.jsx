import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { BiStore } from "react-icons/bi";
import { inventoryRepository } from "../repositories/inventoryRepository";
import InventoryTable from "../components/features/inventory/InventoryTable";
import InventoryForm from "../components/features/inventory/InventoryForm";

const InventoryPage = () => {
  const theme = useTheme();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    const response = await inventoryRepository.getAll();

    if (response.success) {
      setInventory(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSave = async (formData) => {
    if (editingItem) {
      const response = await inventoryRepository.update(editingItem.id, formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchInventory();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    } else {
      const response = await inventoryRepository.create(formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchInventory();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await inventoryRepository.delete(id);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchInventory();
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
          <BiStore style={{ fontSize: "2rem", color: theme.palette.primary.main }} />
          <h2 style={{ margin: 0 }}>Inventory Management</h2>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Item
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

      <InventoryTable
        items={inventory}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <InventoryForm
          item={editingItem}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default InventoryPage;

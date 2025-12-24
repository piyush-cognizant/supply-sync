import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { BiSolidGroup } from "react-icons/bi";
import { vendorRepository } from "../repositories/vendorRepository";
import VendorTable from "../components/features/vendors/VendorTable";
import VendorForm from "../components/features/vendors/VendorForm";

const VendorsPage = () => {
  const theme = useTheme();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setError(response.message);
    }

    setLoading(false);
  };

  const handleOpenDialog = (vendor = null) => {
    setEditingVendor(vendor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVendor(null);
  };

  const handleSave = async (formData) => {
    if (editingVendor) {
      const response = await vendorRepository.update(editingVendor.id, formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchVendors();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    } else {
      const response = await vendorRepository.create(formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchVendors();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      const response = await vendorRepository.delete(id);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchVendors();
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
          <BiSolidGroup style={{ fontSize: "2rem", color: theme.palette.primary.main }} />
          <Box>
            <h2 style={{ margin: 0 }}>Vendors Management</h2>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Vendor
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

      <VendorTable
        vendors={vendors}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <VendorForm
          vendor={editingVendor}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
};

export default VendorsPage;

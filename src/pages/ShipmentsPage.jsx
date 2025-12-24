import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Dialog,
  Alert,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { shipmentRepository } from "../repositories/shipmentRepository";
import ShipmentTable from "../components/features/shipments/ShipmentTable";
import ShipmentForm from "../components/features/shipments/ShipmentForm";
import { mapMessage } from "../constants/message-mapper";

function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  const statusTabs = ["All", "Pending", "In Transit", "Delivered", "Failed"];

  const fetchShipments = async () => {
    setLoading(true);
    const response = await shipmentRepository.getAll();
    if (response.success) {
      setShipments(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  useEffect(() => {
    if (currentTab === 0) {
      setFilteredShipments(shipments);
    } else {
      const statusMap = {
        1: "pending",
        2: "in-transit",
        3: "delivered",
        4: "failed",
      };
      const filtered = shipments.filter(
        (s) => s.status.toLowerCase() === statusMap[currentTab]
      );
      setFilteredShipments(filtered);
    }
  }, [currentTab, shipments]);

  const handleOpenDialog = (shipment = null) => {
    setSelectedShipment(shipment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShipment(null);
  };

  const handleSave = async (formData) => {
    if (selectedShipment) {
      const response = await shipmentRepository.update(selectedShipment.id, formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchShipments();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.message);
      }
    } else {
      const response = await shipmentRepository.create(formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchShipments();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm(mapMessage("CONFIRM_DELETE"))) {
      const response = await shipmentRepository.delete(id);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchShipments();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <h1>Shipments</h1>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
        >
          Add Shipment
        </Button>
      </Box>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
        {statusTabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>

      <ShipmentTable
        shipments={filteredShipments}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <ShipmentForm
          shipment={selectedShipment}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Container>
  );
}

export default ShipmentsPage;

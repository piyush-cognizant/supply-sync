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
import { purchaseRepository } from "../repositories/purchaseRepository";
import PurchaseTable from "../components/features/purchases/PurchaseTable";
import PurchaseForm from "../components/features/purchases/PurchaseForm";
import { mapMessage } from "../constants/message-mapper";

function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  const statusTabs = ["All", "Pending", "Confirmed", "Received", "Cancelled"];

  const fetchPurchases = async () => {
    setLoading(true);
    const response = await purchaseRepository.getAll();
    if (response.success) {
      setPurchases(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    if (currentTab === 0) {
      setFilteredPurchases(purchases);
    } else {
      const statusMap = {
        1: "pending",
        2: "confirmed",
        3: "received",
        4: "cancelled",
      };
      const filtered = purchases.filter(
        (p) => p.status.toLowerCase() === statusMap[currentTab]
      );
      setFilteredPurchases(filtered);
    }
  }, [currentTab, purchases]);

  const handleOpenDialog = (purchase = null) => {
    setSelectedPurchase(purchase);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPurchase(null);
  };

  const handleSave = async (formData) => {
    if (selectedPurchase) {
      const response = await purchaseRepository.update(selectedPurchase.id, formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchPurchases();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.message);
      }
    } else {
      const response = await purchaseRepository.create(formData);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchPurchases();
        handleCloseDialog();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm(mapMessage("CONFIRM_DELETE"))) {
      const response = await purchaseRepository.delete(id);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchPurchases();
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
        <h1>Purchases</h1>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
        >
          Add Purchase
        </Button>
      </Box>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
        {statusTabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>

      <PurchaseTable
        purchases={filteredPurchases}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <PurchaseForm
          purchase={selectedPurchase}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Container>
  );
}

export default PurchasesPage;

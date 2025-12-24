import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const PurchaseForm = ({ purchase, onSave, onCancel }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      poNumber: purchase?.poNumber || "",
      vendorId: purchase?.vendorId || "",
      orderDate: purchase?.orderDate || new Date().toISOString().split("T")[0],
      expectedDelivery:
        purchase?.expectedDelivery || new Date().toISOString().split("T")[0],
      totalAmount: purchase?.totalAmount || 0,
      status: purchase?.status || "Pending",
      items: purchase?.items || "",
    },
  });

  useEffect(() => {
    if (purchase) {
      reset({
        poNumber: purchase.poNumber,
        vendorId: purchase.vendorId,
        orderDate: purchase.orderDate,
        expectedDelivery: purchase.expectedDelivery,
        totalAmount: purchase.totalAmount,
        status: purchase.status,
        items: purchase.items,
      });
    }
  }, [purchase, reset]);

  const handleFormSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <>
      <DialogTitle>{purchase ? "Edit Purchase" : "Add New Purchase"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="poNumber"
                control={control}
                rules={{ required: "PO Number is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="PO Number" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="vendorId"
                control={control}
                rules={{ required: "Vendor ID is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Vendor ID" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="totalAmount"
                control={control}
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Total Amount"
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="orderDate"
                control={control}
                rules={{ required: "Order date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Order Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="expectedDelivery"
                control={control}
                rules={{ required: "Expected delivery is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Expected Delivery"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Received">Received</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="items"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Items Description"
                    multiline
                    rows={3}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleFormSubmit)}
          color="primary"
        >
          {purchase ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default PurchaseForm;

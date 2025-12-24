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

const ShipmentForm = ({ shipment, onSave, onCancel }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      trackingNumber: shipment?.trackingNumber || "",
      orderId: shipment?.orderId || "",
      carrier: shipment?.carrier || "FedEx",
      status: shipment?.status || "Pending",
      shippedDate: shipment?.shippedDate || new Date().toISOString().split("T")[0],
      expectedDelivery:
        shipment?.expectedDelivery || new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (shipment) {
      reset({
        trackingNumber: shipment.trackingNumber,
        orderId: shipment.orderId,
        carrier: shipment.carrier,
        status: shipment.status,
        shippedDate: shipment.shippedDate,
        expectedDelivery: shipment.expectedDelivery,
      });
    }
  }, [shipment, reset]);

  const handleFormSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <>
      <DialogTitle>{shipment ? "Edit Shipment" : "Add New Shipment"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="trackingNumber"
                control={control}
                rules={{ required: "Tracking number is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Tracking Number" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="orderId"
                control={control}
                rules={{ required: "Order ID is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Order ID" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="carrier"
                control={control}
                rules={{ required: "Carrier is required" }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Carrier</InputLabel>
                    <Select {...field} label="Carrier">
                      <MenuItem value="FedEx">FedEx</MenuItem>
                      <MenuItem value="UPS">UPS</MenuItem>
                      <MenuItem value="DHL">DHL</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="shippedDate"
                control={control}
                rules={{ required: "Shipped date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Shipped Date"
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
                rules={{ required: "Expected delivery date is required" }}
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
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Transit">In Transit</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                  </FormControl>
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
          {shipment ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default ShipmentForm;

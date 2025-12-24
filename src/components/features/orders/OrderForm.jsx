import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";

const OrderForm = ({ order, onSave, onCancel }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      vendorId: order?.vendorId || 1,
      orderDate: order?.orderDate || new Date().toISOString().split("T")[0],
      dueDate: order?.dueDate || "",
      totalAmount: order?.totalAmount || 0,
      status: order?.status || "pending",
      paymentStatus: order?.paymentStatus || "unpaid",
    },
  });

  useEffect(() => {
    if (order) {
      reset({
        vendorId: order.vendorId,
        orderDate: order.orderDate,
        dueDate: order.dueDate,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
      });
    }
  }, [order, reset]);

  const handleFormSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <>
      <DialogTitle>{order ? "Edit Order" : "Create New Order"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="vendorId"
                control={control}
                rules={{ required: "Vendor is required" }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Vendor</InputLabel>
                    <Select {...field} label="Vendor">
                      <MenuItem value={1}>Global Logistics Corp</MenuItem>
                      <MenuItem value={2}>Premium Parts Ltd</MenuItem>
                      <MenuItem value={3}>Quick Supplies Inc</MenuItem>
                    </Select>
                  </FormControl>
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
                name="dueDate"
                control={control}
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Due Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="paymentStatus"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Payment Status</InputLabel>
                    <Select {...field} label="Payment Status">
                      <MenuItem value="unpaid">Unpaid</MenuItem>
                      <MenuItem value="partial">Partial</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
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
          {order ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default OrderForm;

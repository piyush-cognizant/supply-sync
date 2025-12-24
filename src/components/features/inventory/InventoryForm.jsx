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
} from "@mui/material";

const InventoryForm = ({ item, onSave, onCancel }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      productName: item?.productName || "",
      sku: item?.sku || "",
      category: item?.category || "",
      quantity: item?.quantity || 0,
      minStock: item?.minStock || 0,
      maxStock: item?.maxStock || 1000,
      unitPrice: item?.unitPrice || 0,
      warehouseLocation: item?.warehouseLocation || "",
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        productName: item.productName,
        sku: item.sku,
        category: item.category,
        quantity: item.quantity,
        minStock: item.minStock,
        maxStock: item.maxStock,
        unitPrice: item.unitPrice,
        warehouseLocation: item.warehouseLocation,
      });
    }
  }, [item, reset]);

  const handleFormSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <>
      <DialogTitle>{item ? "Edit Inventory Item" : "Add New Item"}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Product Name" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="sku"
                control={control}
                rules={{ required: "SKU is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="SKU" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Category" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Current Quantity"
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="unitPrice"
                control={control}
                rules={{ required: "Unit price is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Unit Price"
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="minStock"
                control={control}
                rules={{ required: "Minimum stock is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Min Stock"
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="maxStock"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Max Stock"
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="warehouseLocation"
                control={control}
                rules={{ required: "Warehouse location is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Warehouse Location"
                    required
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
          {item ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default InventoryForm;

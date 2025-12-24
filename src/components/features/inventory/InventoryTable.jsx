import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import { BiEdit, BiTrash } from "react-icons/bi";

const InventoryTable = ({ items, onEdit, onDelete }) => {
  const theme = useTheme();

  const getStockColor = (quantity, minStock, maxStock) => {
    if (quantity < minStock) return "error";
    if (quantity > maxStock * 0.8) return "warning";
    return "success";
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.main,
            "& th": {
              color: theme.palette.primary.contrastText,
              fontWeight: "bold",
            },
          }}
        >
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Min Stock</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                No inventory items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{item.productName}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={item.quantity}
                    color={getStockColor(item.quantity, item.minStock, item.maxStock)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{item.minStock}</TableCell>
                <TableCell align="right">${item.unitPrice}</TableCell>
                <TableCell>{item.warehouseLocation}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => onEdit(item)}>
                    <BiEdit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => onDelete(item.id)}>
                    <BiTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;

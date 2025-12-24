import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import { BiEdit, BiTrash } from "react-icons/bi";

const PurchaseTable = ({ purchases, loading, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "pending") return "warning";
    if (statusLower === "confirmed") return "info";
    if (statusLower === "received") return "success";
    if (statusLower === "cancelled") return "error";
    return "default";
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "action.hover" }}>
            <TableCell>PO Number</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : purchases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No purchases found
              </TableCell>
            </TableRow>
          ) : (
            purchases.map((purchase) => (
              <TableRow key={purchase.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{purchase.id}</TableCell>
                <TableCell>{purchase.vendorId}</TableCell>
                <TableCell>
                  {new Date(purchase.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(purchase.expectedDelivery).toLocaleDateString()}
                </TableCell>
                <TableCell>${purchase.totalAmount?.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={purchase.status}
                    color={getStatusColor(purchase.status)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(purchase)}
                      color="primary"
                    >
                      <BiEdit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(purchase.id)}
                      color="error"
                    >
                      <BiTrash />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;

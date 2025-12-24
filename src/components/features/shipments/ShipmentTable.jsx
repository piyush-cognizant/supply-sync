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

const ShipmentTable = ({ shipments, loading, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "pending") return "warning";
    if (statusLower === "in-transit") return "info";
    if (statusLower === "delivered") return "success";
    if (statusLower === "failed") return "error";
    return "default";
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "action.hover" }}>
            <TableCell>Tracking #</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Carrier</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Shipped Date</TableCell>
            <TableCell>Expected Delivery</TableCell>
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
          ) : shipments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No shipments found
              </TableCell>
            </TableRow>
          ) : (
            shipments.map((shipment) => (
              <TableRow key={shipment.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>
                  {shipment.trackingNumber}
                </TableCell>
                <TableCell>{shipment.orderId}</TableCell>
                <TableCell>{shipment.carrier}</TableCell>
                <TableCell>
                  <Chip
                    label={shipment.status}
                    color={getStatusColor(shipment.status)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(shipment.shippedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(shipment.expectedDelivery).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(shipment)}
                      color="primary"
                    >
                      <BiEdit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(shipment.id)}
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

export default ShipmentTable;

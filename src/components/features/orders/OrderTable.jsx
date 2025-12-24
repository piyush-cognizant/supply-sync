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

const OrderTable = ({ orders, onEdit, onDelete }) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "unpaid":
        return "error";
      default:
        return "default";
    }
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
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="center">Items</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                <TableCell align="right">${order.totalAmount}</TableCell>
                <TableCell align="center">{order.items?.length || 0}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    color={getPaymentColor(order.paymentStatus)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(order)}
                  >
                    <BiEdit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(order.id)}
                  >
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

export default OrderTable;

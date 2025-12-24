import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  BiSolidDashboard,
  BiCart,
  BiSolidGroup,
  BiPackage,
} from "react-icons/bi";
import { analyticsRepository } from "../repositories/analyticsRepository";

const Dashboard = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);

    const response = await analyticsRepository.getDashboard();

    if (response.success) {
      setDashboardData(response.data.dashboard || response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card
      sx={{
        background: theme.palette.background.paper,
        border: `2px solid ${color}`,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ color, fontSize: "2rem" }}>
            <Icon />
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={BiSolidDashboard}
            title="Total Orders"
            value={dashboardData?.totalOrders || 0}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={BiCart}
            title="Pending Orders"
            value={dashboardData?.pendingOrders || 0}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={BiSolidGroup}
            title="Active Vendors"
            value={dashboardData?.activeVendors || 0}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={BiPackage}
            title="In Transit"
            value={dashboardData?.shipmentsInTransit || 0}
            color={theme.palette.info.main}
          />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Financial Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Total Order Value
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${dashboardData?.totalOrderValue || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Inventory Value
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${dashboardData?.inventoryValue || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Low Stock Items
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.lowStockItems || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Completed Orders
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {dashboardData?.completedOrders || 0}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

import { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Switch,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  Alert,
} from "@mui/material";
import { useThemeStore } from "../store/themeStore";

function SettingsPage() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [apiUrl, setApiUrl] = useState("http://localhost:3001");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveSettings = () => {
    localStorage.setItem("apiUrl", apiUrl);
    setSuccessMessage("Settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <h1>Settings</h1>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Theme Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appearance
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box>
                  <Typography>Dark Mode</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enable dark theme for the application
                  </Typography>
                </Box>
                <Switch checked={isDarkMode} onChange={toggleTheme} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* API Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Configuration
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="API Base URL"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:3001"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="textSecondary">
                  The base URL for your backend API server. Default is http://localhost:3001
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* About */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About SupplySync
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" paragraph>
                  <strong>Version:</strong> 1.0.0
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Build:</strong> Production
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Description:</strong> A comprehensive supply chain and vendor management
                  platform for streamlined inventory, order, and shipment tracking.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Database Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Database Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" paragraph>
                  <strong>Type:</strong> JSON Server (Mock Backend)
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Status:</strong> <span style={{ color: "green" }}>●</span> Connected
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Data Modules:</strong> Vendors, Orders, Inventory, Shipments, Purchases,
                  Analytics
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SettingsPage;

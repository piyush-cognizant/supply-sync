import { Outlet } from "react-router";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "../common";

const RootLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Content with proper spacing for mobile menu button */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            mt: isMobile ? 6 : 0,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme.palette.mode === "dark" ? "#1e1e1e" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.mode === "dark" ? "#404040" : "#888",
              borderRadius: "4px",
              "&:hover": {
                background: theme.palette.mode === "dark" ? "#505050" : "#555",
              },
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;

import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import {
  BiMenu,
  BiStore,
  BiGroup,
  BiCart,
  BiBarChartAlt2,
  BiCog,
} from "react-icons/bi";
import { LuLayoutDashboard, LuTruck } from "react-icons/lu";
import { GoPackage } from "react-icons/go";
import LogoutButton from "../features/auth/LogoutButton";

import ThemeSwitcher from "./ThemeSwitcher";

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

const menuItems = [
  { label: "Dashboard", icon: <LuLayoutDashboard />, path: "/" },
  { label: "Orders", icon: <GoPackage />, path: "/orders" },
  { label: "Inventory", icon: <BiStore />, path: "/inventory" },
  { label: "Vendors", icon: <BiGroup />, path: "/vendors" },
  { label: "Shipments", icon: <LuTruck />, path: "/shipments" },
  { label: "Purchases", icon: <BiCart />, path: "/purchases" },
  { label: "Analytics", icon: <BiBarChartAlt2 />, path: "/analytics" },
  { label: "Settings", icon: <BiCog />, path: "/settings" },
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = DRAWER_WIDTH;
  const isCollapsed = false;

  const sidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          SupplySync
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              px: 2,
              py: 1,
              justifyContent: "flex-start",
              color: "inherit",
              textDecoration: "none",
              "&.active": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.contrastText,
                },
                "& .MuiListItemText-primary": {
                  color: theme.palette.primary.contrastText,
                },
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.primary,
                "& .MuiListItemIcon-root": {
                  color: theme.palette.text.primary,
                },
                "& .MuiListItemText-primary": {
                  color: theme.palette.text.primary,
                },
              },
              transition: "all 0.3s ease",
            }}
            end
          >
            <ListItemIcon
              sx={{
                minWidth: 56,
                justifyContent: "center",
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{ primary: { noWrap: true, sx: { color: "inherit" } } }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Divider */}
      <Divider />

      {/* Logout Button */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
        <LogoutButton />
        <ThemeSwitcher />
      </Box>

    </Box>

  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <BiMenu />
          </IconButton>
        </Box>
      )}

      {/* Desktop Drawer (Always Open) */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Mobile Drawer (Temporary) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

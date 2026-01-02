import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import LoginCard from "../components/features/auth/LoginCard.jsx";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isHydrated, navigate]);

  if (!isHydrated) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.backgroundColor, // base theme color
        backgroundImage: `url("https://www.toptal.com/designers/subtlepatterns/uploads/doodles.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        position: "relative",
      }}
    >
      <LoginCard />
    </Box>
  );
};

export default LoginPage;

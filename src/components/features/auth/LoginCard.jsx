import { useState } from "react";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Paper,
} from "@mui/material";

const LoginCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      login({ token: "dummy-token", email });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        borderRadius: 4,
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        backgroundColor: "white",
        color: theme.palette.text.primary,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={1}>
        SUPPLY SYNC
      </Typography>
      <Typography variant="body2" mb={3} color="text.secondary">
        Sign in to continue
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.2,
            borderRadius: 3,
            fontWeight: "bold",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Send Login Link"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginCard;

import { IconButton, useTheme } from "@mui/material";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useThemeStore } from "../../store/themeStore.jsx";

const ThemeSwitcher = () => {
  const theme = useTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme.palette.mode === "dark";

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        fontSize: "1.3rem",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "rotate(20deg)",
        },
      }}
    >
      {isDark ? <BiSolidSun /> : <BiSolidMoon />}
    </IconButton>
  );
};

export default ThemeSwitcher;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      theme: lightTheme,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
          theme: state.isDarkMode ? lightTheme : darkTheme,
        })),
      setTheme: (isDark) =>
        set({
          isDarkMode: isDark,
          theme: isDark ? darkTheme : lightTheme,
        }),
    }),
    {
      name: "theme-store",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.theme = state.isDarkMode ? darkTheme : lightTheme;
        }
      },
    }
  )
);

export const ThemeProvider = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

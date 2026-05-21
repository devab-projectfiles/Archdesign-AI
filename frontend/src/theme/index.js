import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#0d9488", // Blueprint Teal
      light: "#2dd4bf",
      dark: "#0f766e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d97706", // Warm amber
    },
    background: {
      default: mode === "light" ? "#fbfaf7" : "#1F1F1E", // Warm ivory vs sleek dark graphite #1F1F1E
      paper: mode === "light" ? "#ffffff" : "#2C2C2A",  // White paper vs sleek dark input/sidebar #2C2C2A
    },
    text: {
      primary: mode === "light" ? "#191919" : "#ecebe8", // Warm black vs warm ivory white
      secondary: mode === "light" ? "#6b6a65" : "#aba8a2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Remove weird overlay in dark mode MUI
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

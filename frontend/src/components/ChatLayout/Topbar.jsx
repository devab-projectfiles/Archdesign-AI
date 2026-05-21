import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppContext } from "../../context/AppContext";

export default function Topbar({ handleDrawerToggle }) {
  const { mode, toggleColorMode } = useAppContext();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        backdropFilter: "blur(8px)",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.8)"
            : "rgba(30,41,59,0.8)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          ArchDesign AI
        </Typography>
        <Box>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ mr: 1 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}>
              U
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

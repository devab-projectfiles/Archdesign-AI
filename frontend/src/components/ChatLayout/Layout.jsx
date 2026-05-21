import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAppContext } from "../../context/AppContext";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sidebarOpen } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Sidebar container with smooth collapse transition */}
      <Box
        sx={{
          width: {
            xs: 0,
            sm: sidebarOpen ? 280 : 0,
          },
          transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            sm: sidebarOpen ? "calc(100% - 280px)" : "100%",
          },
          transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          p: 1, // Claude has no outer margin, it goes all the way to the top/sides!
          minHeight: 0,
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor:
              theme.palette.mode === "light" ? "background.paper" : "#1F1F1E", // User wanted chat page background to be #1F1F1E
            borderRadius: 0, // 100% full screen corners
            overflow: "hidden",
            position: "relative",
            minHeight: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

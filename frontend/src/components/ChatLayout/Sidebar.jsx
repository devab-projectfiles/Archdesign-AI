import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import hero from "../../assets/hero.png";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import { useAppContext } from "../../context/AppContext";

export default function Sidebar({ mobileOpen, handleDrawerToggle, isMobile }) {
  const { chats, setCurrentChatId, currentChatId, sidebarOpen, toggleSidebar } =
    useAppContext();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1.5,
              bgcolor: "primary.main",
              mr: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrastText",
            }}
          >
            <ArchitectureIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "text.primary",
            }}
          >
            ArchDesign AI
          </Typography>
        </Box>
        <IconButton
          onClick={() => toggleSidebar()}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 2 }}>
        <ListItemButton
          onClick={() => {
            setCurrentChatId(null);
            if (isMobile) handleDrawerToggle();
          }}
          sx={{
            borderRadius: "20px",
            border: (theme) =>
              theme.palette.mode === "light"
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : "1px solid rgba(255, 255, 255, 0.12)",
            color: "text.primary",
            py: 0.75,
            px: 2,
            justifyContent: "center",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(255, 255, 255, 0.04)",
            },
          }}
        >
          <AddIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <ListItemText
            primary="New chat"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: "0.85rem",
              color: "text.primary",
            }}
            sx={{ flex: "none" }}
          />
        </ListItemButton>
      </Box>

      {/* Slim Search Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "18px",
            height: 32,
            fontSize: "0.8rem",
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.03)"
                : "rgba(255,255,255,0.03)",
            border: "none",
            "& fieldset": {
              border: (theme) =>
                theme.palette.mode === "light"
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.08)",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "1px",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary", fontSize: 16 }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Main Navigation List */}
      <List sx={{ px: 0, pt: 0, mb: 2 }}>
        {[
          { text: "Explore", icon: <LanguageIcon sx={{ fontSize: 16 }} /> },
          { text: "Library", icon: <MenuBookIcon sx={{ fontSize: 16 }} /> },
          { text: "Files", icon: <FolderIcon sx={{ fontSize: 16 }} /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                py: 0.5,
                px: 1.5,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.03)"
                      : "rgba(255, 255, 255, 0.03)",
                  color: "text.primary",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography
        variant="caption"
        sx={{
          px: 1.5,
          py: 0.75,
          color: "text.secondary",
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          display: "block",
          mb: 0.5,
        }}
      >
        Recent
      </Typography>

      <List sx={{ flexGrow: 1, overflowY: "auto", px: 0 }}>
        {chats.length > 0 && (
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 1,
              color: "text.secondary",
              fontWeight: 600,
              display: "block",
            }}
          >
            Today
          </Typography>
        )}
        {chats.map((chat) => (
          <ListItem key={chat.id} disablePadding sx={{ mb: 0 }}>
            <ListItemButton
              selected={currentChatId === chat.id}
              onClick={() => {
                setCurrentChatId(chat.id);
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                py: 0.6,
                px: 1.5,
                mb: 0.25,
                bgcolor:
                  currentChatId === chat.id
                    ? (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.05)"
                          : "rgba(255, 255, 255, 0.06)"
                    : "transparent",
                color: "text.primary",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.03)"
                      : "rgba(255, 255, 255, 0.03)",
                },
              }}
            >
              <ListItemText
                primary={chat.title || "New Conversation"}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "0.85rem",
                  color:
                    currentChatId === chat.id
                      ? "text.primary"
                      : "text.secondary",
                  fontWeight: currentChatId === chat.id ? 500 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          pt: 2,
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: 2,
          bgcolor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Avatar src="" sx={{ width: 36, height: 36, mr: 1.5 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{ fontSize: "0.85rem", fontWeight: 600, color: "text.primary" }}
          >
            Abreham Semu
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            abreham@gmail.com
          </Typography>
        </Box>
        <IconButton size="small">
          <LogoutIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </IconButton>
      </Box>
    </Box>
  );

  const drawerWidth = 280;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: sidebarOpen ? drawerWidth : 0 },
        flexShrink: { sm: 0 },
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: sidebarOpen ? "block" : "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#f4f0ea" : "#1F1F1E",
            transform: {
              xs: "none",
              sm: sidebarOpen ? "none" : "translateX(-280px)",
            },
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

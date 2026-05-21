import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { useChat } from "../hooks/useChat";
import ChatMessage from "../components/Chat/ChatMessage";
import ChatInput from "../components/Chat/ChatInput";
import Layout from "../components/ChatLayout/Layout";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../context/AppContext";

// Simple pulsing dot skeleton
function TypingSkeleton() {
  return (
    <Box sx={{ display: "flex", gap: 1, p: 2 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out 0.2s",
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out 0.4s",
        }}
      />
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
    </Box>
  );
}

function SuggestionCard({ icon, title, desc }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 3,
        height: "100%",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "light" ? "#e8e6e1" : "rgba(255,255,255,0.05)",
        cursor: "pointer",
        transition: "all 0.2s",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#fcfbfa" : "#2d2d2a",
        "&:hover": {
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#f4f0ea" : "#383835",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "#0d9488"
              : "rgba(255,255,255,0.1)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box sx={{ color: "text.secondary", mb: 0.5 }}>{icon}</Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", lineHeight: 1.2, display: "block" }}
      >
        {desc}
      </Typography>
    </Paper>
  );
}

export default function ChatPage() {
  const { messages, sendMessage, loading, error } = useChat();
  const bottomRef = useRef(null);
  const { toggleSidebar, sidebarOpen } = useAppContext();

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Layout>
      {/* Topbar: Must not shrink */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          borderBottom: messages.length > 0 ? "1px solid" : "none",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "#e8e6e1"
              : "rgba(255,255,255,0.05)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!sidebarOpen && (
            <IconButton
              onClick={toggleSidebar}
              sx={{
                mr: 1,
                p: 0.5,
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
          )}
          <Button
            endIcon={<ExpandMoreIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              textTransform: "none",
              color: "text.primary",
              fontWeight: 600,
              fontSize: "0.88rem",
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#f4f0ea" : "#2c2c2a",
              borderRadius: 8,
              px: 1.5,
              py: 0.5,
              height: 30,
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "#ebe6df" : "#3c3c3a",
              },
            }}
          >
            ArchDesign AI
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
          <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
            <MoreHorizIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
            <LinkIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon sx={{ fontSize: "14px !important" }} />}
            sx={{
              textTransform: "none",
              borderRadius: 8,
              ml: 0.5,
              height: 30,
              px: 1.5,
              fontSize: "0.8rem",
              borderColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#e8e6e1"
                  : "rgba(255,255,255,0.1)",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(13, 148, 136, 0.04)",
              },
            }}
          >
            Export chat
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 8,
              height: 30,
              px: 1.5,
              fontSize: "0.8rem",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Upgrade
          </Button>
        </Box>
      </Box>

      {/* Scrollable middle container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 840,
            mx: "auto",
            p: { xs: 1, sm: 2 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 2,
                pb: 1,
                m: "auto",
              }}
            >
              <Box className="gradient-orb" sx={{ mb: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  color: "primary.main",
                  mb: 0.5,
                  textAlign: "center",
                }}
              >
                Hello
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                  mb: 3,
                }}
              >
                How can I assist you today?
              </Typography>

              {/* Suggestions forced into horizontal row */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1.5,
                  width: "100%",
                  mb: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<MoreHorizIcon />}
                    title="Synthesize Data"
                    desc="Summarize complex reports, extract key trends, and organize raw information."
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<LightbulbOutlinedIcon />}
                    title="Creative Brainstorm"
                    desc="Generate innovative ideas, brand slogans, or concept strategies for your next big project."
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<MoreHorizIcon />}
                    title="Check Facts"
                    desc="Analyze logical consistency, verify complex dates, or technical specifications."
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {loading && (
                <Box sx={{ mb: 3 }}>
                  <TypingSkeleton />
                </Box>
              )}
              {error && (
                <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}

          <div ref={bottomRef} />
        </Box>
      </Box>

      {/* Frozen Footer Box */}
      <Box
        sx={{
          flexShrink: 0,
          pt: 1,
          pb: 0,
          width: "100%",
          maxWidth: 840,
          mx: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <ChatInput onSendMessage={sendMessage} disabled={loading} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1.5,
            position: "relative",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Join the AI developers community for more insights{" "}
            <span
              style={{
                color: "#0d9488",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Join Discord
            </span>
          </Typography>
          <Box
            sx={{ position: "absolute", right: 16, display: "flex", gap: 1 }}
          >
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#e8e6e1"
                    : "rgba(255,255,255,0.1)",
                color: "text.secondary",
              }}
            >
              <LanguageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#e8e6e1"
                    : "rgba(255,255,255,0.1)",
                color: "text.secondary",
              }}
            >
              <HelpOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

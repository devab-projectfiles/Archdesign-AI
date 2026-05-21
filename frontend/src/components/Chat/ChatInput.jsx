import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MicIcon from "@mui/icons-material/Mic";

export default function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", px: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 1.2,
          borderRadius: "20px",
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#fcfbfa" : "#2C2C2A",
          border: (theme) =>
            theme.palette.mode === "light"
              ? "1px solid #e8e6e1"
              : "1px solid rgba(255,255,255,0.05)",
          mb: 1,
          transition: "all 0.2s",
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 1px rgba(13, 148, 136, 0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, mb: 0.5 }}>
          <TextField
            fullWidth
            placeholder="Ask anything"
            multiline
            maxRows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "0.95rem",
                color: "inherit",
                paddingLeft: "4px",
                paddingRight: "4px",
              },
            }}
            sx={{
              flexGrow: 1,
              "& .MuiInput-underline:before": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none !important",
              },
            }}
          />

          {/* Ultra-sleek Send Button - Positioned UP like ChatGPT/Grok */}
          <Box
            onClick={handleSend}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: input.trim() ? "primary.main" : "primary.light",
              color: "#fff",
              mb: 0.25,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: input.trim() ? "primary.dark" : "primary.light",
                transform: "scale(1.05)",
              },
            }}
          >
            <MicIcon sx={{ fontSize: 22 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 0.5,
          }}
        >
          {/* Left Actions */}
          <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <AutoAwesomeIcon sx={{ fontSize: "9px !important" }} />
              }
              sx={{
                height: 20,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: "0.5rem",
                borderColor: "primary.light",
                color: "primary.main",
                bgcolor: "rgba(13, 148, 136, 0.04)",
                px: 1.2,
                py: 0,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "rgba(13, 148, 136, 0.12)",
                  borderColor: "primary.main",
                },
              }}
            >
              Deeper Research
            </Button>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <ImageIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <LightbulbOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <SettingsOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <LanguageOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Bottom bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            color: "text.primary",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 14, color: "primary.main" }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              fontSize: "0.75rem",
              color: "text.secondary",
            }}
          >
            Saved prompts
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AttachFileIcon sx={{ fontSize: "13px !important" }} />}
          sx={{
            height: 26,
            borderRadius: "13px",
            textTransform: "none",
            fontSize: "0.75rem",
            color: "text.secondary",
            borderColor: (theme) =>
              theme.palette.mode === "light"
                ? "#e8e6e1"
                : "rgba(255,255,255,0.1)",
            px: 1.5,
            py: 0,
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.05)",
              borderColor: "text.secondary",
            },
          }}
        >
          Attach file
        </Button>
      </Box>
    </Box>
  );
}

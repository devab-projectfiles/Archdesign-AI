import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  // Simple markdown formatting (split paragraphs, basic bold simulation)
  const renderContent = (text) => {
    return text.split("\n").map((str, idx) => {
      if (str.startsWith("###")) {
        return (
          <Typography
            key={idx}
            variant="h6"
            sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
          >
            {str.replace("###", "").trim()}
          </Typography>
        );
      }
      if (str.startsWith("* ")) {
        return (
          <Box component="li" key={idx} sx={{ ml: 2, mb: 0.5 }}>
            <Typography variant="body1">{str.replace("* ", "")}</Typography>
          </Box>
        );
      }
      return (
        <Typography
          key={idx}
          variant="body1"
          sx={{ mb: 1, minHeight: str ? 0 : "1rem" }}
        >
          {str}
        </Typography>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 3,
      }}
    >
      {!isUser && (
        <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 36, height: 36 }}>
          <AutoAwesomeIcon fontSize="small" />
        </Avatar>
      )}

      <Paper
        elevation={isUser ? 0 : 2}
        sx={{
          p: 2,
          maxWidth: "85%",
          borderRadius: 3,
          borderTopRightRadius: isUser ? 0 : 12,
          borderTopLeftRadius: !isUser ? 0 : 12,
          bgcolor: isUser ? "primary.main" : "background.paper",
          color: isUser ? "primary.contrastText" : "text.primary",
        }}
      >
        {renderContent(message.content)}
      </Paper>

      {isUser && (
        <Avatar
          sx={{ bgcolor: "secondary.main", ml: 2, width: 36, height: 36 }}
        >
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Box>
  );
}

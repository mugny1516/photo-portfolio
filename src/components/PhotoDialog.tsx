import React from "react";
import { Box, Dialog, IconButton, Fade, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Photo } from "../types/photo";
import { formatTakenAt } from "../utils/photo";
import { useTheme } from "../contexts/ThemeContext";

type PhotoDialogProps = {
  open: boolean;
  photo: Photo;
  fade: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const PhotoDialog: React.FC<PhotoDialogProps> = ({
  open,
  photo,
  fade,
  onClose,
  onPrev,
  onNext,
}) => {
  const { backgroundColor, textColor } = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: backgroundColor,
          boxShadow: "none",
          position: "relative",
          minHeight: "60vh",
        },
      }}
    >
      {/* 閉じるボタン */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          color: textColor,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* 画像コンテンツ */}
      <Fade in={fade} timeout={300}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(80vh - 64px)",
            p: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={photo.img.url}
            alt={`撮影日時: ${photo.takenAt}`}
            sx={{
              objectFit: "contain",
              width: "auto",
              height: "auto",
              maxWidth: "64vw",
              maxHeight: "60vh",
            }}
          />
        </Box>
      </Fade>

      {/* 下部ナビゲーション */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          px: 2,
          color: textColor,
        }}
      >
        <IconButton onClick={onPrev} sx={{ color: textColor }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ color: textColor }}>
          {formatTakenAt(photo.takenAt)}
        </Typography>
        <IconButton onClick={onNext} sx={{ color: textColor }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default PhotoDialog;

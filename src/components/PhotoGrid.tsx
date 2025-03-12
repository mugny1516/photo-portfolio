import React, { useState, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Photo } from "../types/photo";
import { formatTakenAt } from "../utils/photo";
import PhotoDialog from "./PhotoDialog";

type PhotoGridProps = {
  photos: Photo[];
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  // 選択中の画像インデックスを保持
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // フェード用の状態
  const [fade, setFade] = useState(true);

  const handleClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);
  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);
  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setFade(false);
      setTimeout(() => {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : 0
        );
        setFade(true);
      }, 200);
    }
  }, [selectedIndex, photos.length]);
  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setFade(false);
      setTimeout(() => {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % photos.length : 0
        );
        setFade(true);
      }, 200);
    }
  }, [selectedIndex, photos.length]);

  return (
    <>
      <Box px={{ xs: 2, md: 12 }} ml={{ xs: 0, md: 9 }}>
        <Grid container spacing={2}>
          {photos.map((photo, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={2.4}
              lg={2}
              key={photo.id}
              sx={{ position: "relative" }}
              // サイドバーからのスクロール用
              data-hour={new Date(photo.takenAt).getHours()}
            >
              <Box
                onClick={() => handleClick(index)}
                sx={{
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                }}
              >
                {/* 画像：ホバー時に拡大 */}
                <Box
                  component="img"
                  src={photo.img.url}
                  alt={`撮影日時: ${photo.takenAt}`}
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* ホバー時に表示する撮影日時 */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    opacity: 0,
                    transition: "opacity 0.45s ease-in-out",
                    "&:hover": { opacity: 0.95 },
                  }}
                >
                  <Typography variant="subtitle1" color="white">
                    {formatTakenAt(photo.takenAt)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* ダイアログ */}
      {selectedIndex !== null && (
        <PhotoDialog
          open={selectedIndex !== null}
          fade={fade}
          photo={photos[selectedIndex]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default PhotoGrid;

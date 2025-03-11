import React from "react";
import { Box } from "@mui/material";
import { usePhotos } from "../hooks/photoHooks";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { calculateOpacity, getClosestPhoto } from "../utils/photo";

type FullscreenPhotoProps = {
  scrollPosition: number;
};

const FullscreenPhoto: React.FC<FullscreenPhotoProps> = ({
  scrollPosition,
}) => {
  const { data, error, isLoading } = usePhotos();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  // 現在時刻に最も近い写真を取得
  const closestPhoto = getClosestPhoto(data || []);
  console.log(data && data[0]);

  // スクロール位置に応じた透明度を計算
  const opacity = calculateOpacity(scrollPosition);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        opacity: opacity,
        transition: "opacity 0.3s",
      }}
    >
      {closestPhoto && (
        <img
          src={closestPhoto.img.url}
          alt={`撮影日時: ${closestPhoto.takenAt}`}
          style={{
            minWidth: "50%",
            maxWidth: "70%",
            maxHeight: "70%",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
};

export default FullscreenPhoto;

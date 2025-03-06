import React from "react";
import FullscreenPhoto from "../components/FullscreenPhoto";
import Sidebar from "../components/Sidebar";
import PhotoGrid from "../components/PhotoGrid";
import { useScrollPosition } from "../hooks/scrollPositionHooks";
import { Box } from "@mui/material";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";
import { usePhotos } from "../hooks/photoHooks";
import { getBackgroundColor, sortPhotosByHour } from "../utils/photo";
import { useCurrentHourFromPhotos } from "../hooks/currentHourFromPhotosHooks";
import Layout from "../components/Layout";

const HomePage: React.FC = () => {
  const { data, error, isLoading } = usePhotos();
  const scrollPosition = useScrollPosition();
  const currentHour = useCurrentHourFromPhotos(scrollPosition);

  const bgColorByCurrenTime = getBackgroundColor(currentHour);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <Layout backgroundColor={bgColorByCurrenTime}>
      <Box
        sx={{
          backgroundColor: bgColorByCurrenTime,
          transition: "background-color 0.3s",
        }}
      >
        <FullscreenPhoto scrollPosition={scrollPosition} />
        <Box sx={{ display: "flex", minHeight: "160vh" }}>
          <Sidebar />
          <PhotoGrid photos={sortPhotosByHour(data ?? [])} />
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;

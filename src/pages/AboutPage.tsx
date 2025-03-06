import React from "react";
import { Typography, Box } from "@mui/material";
import { getBackgroundColor } from "../utils/photo";
import Layout from "../components/Layout";
import { useAbout } from "../hooks/aboutHooks";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";

// About 型の定義（提供された型を使用）
export type About = {
  title: string;
  description: string;
  img: Image;
};

type Image = {
  url: string;
  height: string;
  width: string;
};

const AboutPage: React.FC = () => {
  const { data, error, isLoading } = useAbout();
  const currentHour = new Date().getHours();
  const bgColorByCurrentTime = getBackgroundColor(currentHour);
  const textColor = bgColorByCurrentTime === "black" ? "white" : "black";

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <Layout backgroundColor={bgColorByCurrentTime}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 4,
          color: textColor,
          gap: 3, // 要素間に余白を追加
          maxWidth: "800px", // コンテンツ幅を制限
          mx: "auto", // 左右中央揃え
        }}
      >
        {data && (
          <>
            {/* サブタイトル */}
            <Typography variant="h6" component="h1" gutterBottom>
              {data.title}
            </Typography>

            {/* 画像 */}
            {data.img && (
              <Box
                component="img"
                src={data.img.url}
                alt={data.title}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  marginY: 4,
                }}
              />
            )}

            {/* 説明文 */}
            <Typography
              variant="body1"
              sx={{
                maxWidth: "600px",
                textAlign: "center",
                lineHeight: 1.8, // 行間を広げて読みやすく
              }}
            >
              {data.description}
            </Typography>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default AboutPage;

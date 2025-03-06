import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "../contexts/ThemeContext";

type LayoutProps = {
  backgroundColor?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
  backgroundColor = "white",
  children,
}) => {
  return (
    <ThemeProvider backgroundColor={backgroundColor}>
      <Box
        sx={{
          backgroundColor,
          transition: "background-color 0.3s",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

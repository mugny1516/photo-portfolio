import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        minHeight: "200px",
        backgroundColor: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="caption">
        © 2025 Photo Portfolio. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

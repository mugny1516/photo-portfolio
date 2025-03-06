import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        background: "white",
        color: "white",
      }}
    >
      <CircularProgress size={48} sx={{ color: "black" }} />
    </Box>
  );
};

export default Loading;

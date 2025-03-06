import { Button, Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        background: "white",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#333",
              marginBottom: 2,
            }}
          >
            ページが見つかりません
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              marginBottom: 3,
            }}
          >
            ご指定のページは存在しません。URLを確認するか、ホームに戻ってください。
          </Typography>
          <Button component={Link} to="/" variant="contained">
            ホームへ戻る
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;

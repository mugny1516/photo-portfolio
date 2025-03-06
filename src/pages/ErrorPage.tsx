import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { css } from "@emotion/react";

const containerStyle = css`
  background: white;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const ErrorPage = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <Container maxWidth="sm" sx={containerStyle}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        py={5}
        px={5}
        gap={2}
      >
        <Typography
          variant="h6"
          color="error"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          予期せぬエラーが発生しました。
        </Typography>
        <Typography variant="body1">
          再度読み込んでいただくと、正常にデータを取得できる可能性があります。エラーが続く場合は時間をおいて再度お試しください。
        </Typography>

        <Button
          variant="contained"
          onClick={handleReload}
          sx={{
            width: "96%",
            padding: "14px 20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "4px",
            marginTop: "20px",
          }}
        >
          再度読み込む
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;

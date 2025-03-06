import React, { useState } from "react";
import { useAuth } from "../hooks/authHooks";
import { Box, Button, FormControl, Input, Typography } from "@mui/material";
import Loading from "./Loading";
import { useEnqueueSnackbar } from "./snackbar/Snackbar";

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState("");
  const { setAuthenticated, isLoading } = useAuth();
  const enqueSnackbar = useEnqueueSnackbar();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "0000") {
      setAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      window.location.reload();
    } else {
      enqueSnackbar("パスワードが間違っています", { variant: "warning" });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        パスワードを入力してください
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "auto",
        }}
      >
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスコードを入力"
          disableUnderline={true}
          sx={{
            padding: "5px",
            width: "200px",
            fontSize: "12px",
            border: "1px solid black",
            borderRadius: "4px 0 0 4px",
            "&:focus": {
              outline: "none",
              border: "1px solid black",
            },
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{
            height: "38px",
            fontSize: "12px",
            cursor: "pointer",
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderLeft: "none",
            borderRadius: "0 4px 4px 0",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          送信
        </Button>
      </FormControl>
    </Box>
  );
};

export default PasswordInput;

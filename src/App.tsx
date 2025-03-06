import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SWRConfig } from "swr";
import { useEnqueueSnackbar } from "./components/snackbar/Snackbar";
import { UnNotifiedError } from "./services/Error";

const theme = createTheme({});

const App: React.FC = () => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const onError = (error: Error) => {
    if (error instanceof UnNotifiedError) {
      // スナックバーによる通知が必要のないエラーはスルー
      return;
    }
    enqueueSnackbar("データの取得に失敗しました", {
      variant: "error",
    });
  };
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        focusThrottleInterval: 0,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;

import { css } from "@emotion/react";
import { Alert } from "@mui/material";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  SnackbarProvider,
  useSnackbar,
  VariantType,
} from "notistack";
import { ComponentProps, JSX, memo, ReactNode, useCallback } from "react";
import { SnackMessage } from "./NotistackContent";

type AlertProps = ComponentProps<typeof Alert>;
type AlertInsideSnackbarProps = {
  variant?: VariantType;
  children?: ReactNode;
  alertProps?: AlertProps;
  onClose: () => void;
};

const alertStyle = css({
  maxWidth: "100%",
  width: "auto",
  margin: "auto",

  ["& .MuiAlert-message"]: {
    display: "flex",
    alignItems: "center",
  },
});

export const useEnqueueSnackbar: () => (
  message: SnackbarMessage,
  options?: OptionsObject,
  alertProps?: AlertProps
) => SnackbarKey = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useCallback(
    (message, rawOptions, alertProps) => {
      const options = rawOptions ?? {};
      if (!options.key) {
        options.key = Date.now();
      }
      return enqueueSnackbar(
        <AlertInsideSnackbar
          alertProps={alertProps}
          children={message}
          onClose={() => closeSnackbar(options.key)}
          variant={options?.variant}
        />,
        options
      );
    },
    [closeSnackbar, enqueueSnackbar]
  );
};

const AlertInsideSnackbar = memo(
  (props: AlertInsideSnackbarProps): JSX.Element => {
    const severity: ComponentProps<typeof Alert>["severity"] =
      props.variant === "default" ? "info" : props.variant;

    return (
      <Alert
        sx={alertStyle}
        elevation={6}
        severity={severity}
        variant="filled"
        {...props.alertProps}
        children={props.children}
        onClick={(e) => {
          if (props.alertProps?.onClick) {
            props.alertProps.onClick(e);
            props.onClose();
          }
        }}
        onClose={(e) => {
          e.stopPropagation();
          props.alertProps?.onClose?.(e);
          props.onClose();
        }}
      />
    );
  }
);

export const EnqueueSnackbarProvider = memo(
  ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        content={(key, message) => <SnackMessage id={key} message={message} />}
      >
        {children}
      </SnackbarProvider>
    );
  }
);

import { SnackbarContent } from "notistack";
import { forwardRef } from "react";

export const SnackMessage = forwardRef<
  HTMLDivElement,
  { id: string | number; message: string | React.ReactNode }
>((props, ref) => {
  return <SnackbarContent ref={ref}>{props.message}</SnackbarContent>;
});

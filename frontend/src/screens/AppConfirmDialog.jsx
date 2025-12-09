import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import LoadingWrapper from "../components/Shared/Loading/LoadingWrapper";

export const AppConfirmDialog = (props) => {
  const {
    title = "Confirm Action!",
    open = false,
    onConfirm = () => {},
    onClose = () => {},
    children,
    loading = false,
    loadingText = "Confirming Action",
    maxWidth = "md",
    hideIcon = false,
    dialogIcon: DialogIcon = () => <WarningAmberOutlinedIcon color="warning" />,
    ...otherProps
  } = props;

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      aria-labelledby="confirmation-dialog"
      {...otherProps}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Box display="flex" alignItems="center" gap={1}>
          {!hideIcon && <DialogIcon />}

          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>

      <LoadingWrapper {...{ loading, loadingText }}>
        <DialogContent
          dividers
          className="grid min-h-[100px] grid-cols-1 place-content-center"
        >
          {children}
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton variant="contained" onClick={onConfirm}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </LoadingWrapper>
    </Dialog>
  );
};

export default AppConfirmDialog;

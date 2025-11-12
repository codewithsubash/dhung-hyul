import React from "react";
import { Alert, AlertTitle, Button, Snackbar } from "@mui/material";
import { WifiOffOutlined, WifiOutlined } from "@mui/icons-material";

const NetworkStatus = () => {
  const [showStatus, setShowStatus] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);

  // methods
  const handleReloadAction = () => {
    setShowStatus(false);
    window.location.reload();
  };

  React.useEffect(() => {
    if (!isOnline) return;

    const _interval = setInterval(() => {
      setShowStatus(false);
    }, 10 * 1000);

    return () => clearInterval(_interval);
  }, [isOnline]);

  React.useEffect(() => {
    const __changeStatus = () => {
      setShowStatus(true);
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", __changeStatus);
    window.addEventListener("offline", __changeStatus);

    return () => {
      window.removeEventListener("online", __changeStatus);
      window.removeEventListener("offline", __changeStatus);
    };
  }, []);

  return (
    <Snackbar
      open={showStatus}
      onClose={() => setShowStatus(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ClickAwayListenerProps={{ mouseEvent: false }}
    >
      <Alert
        icon={isOnline ? <WifiOutlined /> : <WifiOffOutlined />}
        severity={isOnline ? "success" : "error"}
        action={
          isOnline && (
            <Button color="inherit" size="small" onClick={handleReloadAction}>
              Reload
            </Button>
          )
        }
      >
        <AlertTitle> {isOnline ? "Online" : "Offline"} </AlertTitle>

        {isOnline
          ? "You're back online! Reload page to continue."
          : "You seem to have some network connectivity problem!"}
      </Alert>
    </Snackbar>
  );
};

export default NetworkStatus;

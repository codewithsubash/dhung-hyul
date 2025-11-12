import { Button, CircularProgress, Typography } from "@mui/material";

export const LoadingButton = (props) => {
  const { loading, loadingText = "", ...other } = props;

  if (loading) {
    return (
      <Button
        style={{
          textTransform: "none",
          paddingBlock: props?.size === "small" ? "4px" : "8px",
          pointerEvents: loading ? "none" : "",
          fontSize: props?.size === "small" ? 12 : 16,
        }}
        {...other}

        // onClick={() => {}}
      >
        <CircularProgress
          size="14px"
          style={{
            color:
              props?.variant === "undefined" || props?.variant === "contained"
                ? "white"
                : "#3F51B5",
            marginRight: "8px",
          }}
        />
        {loadingText && (
          <Typography
            style={{
              textTransform: "none",
            }}
            fontSize={props?.size}
          >
            {loadingText}
          </Typography>
        )}
      </Button>
    );
  } else {
    return (
      <Button
        {...other}
        style={{
          textTransform: "none",
        }}
      />
    );
  }
};

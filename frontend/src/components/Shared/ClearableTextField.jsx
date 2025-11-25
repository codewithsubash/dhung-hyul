import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { SearchOutlined, Close } from "@mui/icons-material";

const ClearableTextField = ({
  typing = false,
  handleClear = () => {},
  ...props
}) => {
  return (
    <TextField
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined fontSize="small" />
          </InputAdornment>
        ),
        ...(!!handleClear &&
          props?.value?.length && {
            endAdornment: !typing ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  disabled={props.disabled}
                  onClick={handleClear}
                >
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : (
              <div className="inline-block flex-shrink-0 pl-2">
                <span className="loading"> • • •</span>
              </div>
            ),
          }),
      }}
      {...props}
    />
  );
};

export default ClearableTextField;

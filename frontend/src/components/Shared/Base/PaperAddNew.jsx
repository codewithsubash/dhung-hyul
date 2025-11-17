import React from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Paper } from "@mui/material";

import { useBaseAutocompleteContext } from "./BaseAutocomplete";
import { BASE_CONSTANTS } from "../../../constants/baseConstant";

export const PaperAddNew = ({ children, buttonLabel = "New", onAddNew }) => {
  const { inputValue } = useBaseAutocompleteContext();

  return (
    <Paper>
      {children}

      {!!inputValue && !!onAddNew && (
        <Box
          padding={BASE_CONSTANTS.PADDING_SM}
          paddingY={BASE_CONSTANTS.PADDING_SM / 2}
        >
          <Button
            fullWidth
            startIcon={<Add />}
            color="primary"
            variant="contained"
            onMouseDown={() => onAddNew(inputValue)}
          >
            {buttonLabel}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

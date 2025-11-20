import React from "react";
import { Box, Paper } from "@mui/material";

import InnerShadowBox from "../InnerShadowBox";
import { BASE_CONSTANTS } from "../../../constants/baseConstant";
import BaseCheckbox from "./BaseCheckbox";
import { useBaseAutocompleteContext } from "./BaseAutocomplete";

export const PaperSelectAll = ({
  children,
  label = "Select All",
  onSelectAll = () => {},
}) => {
  const { value, options, loading } = useBaseAutocompleteContext();

  return (
    <Paper>
      {!loading && options?.length !== 0 && (
        <InnerShadowBox>
          <Box
            padding={BASE_CONSTANTS.PADDING_SM}
            paddingY={BASE_CONSTANTS.PADDING_SM / 3}
            className="flex align-middle"
          >
            <BaseCheckbox
              value={!!value?.length && value?.length === options?.length}
              onMouseDown={() => {
                console.log("Clicked!");
                onSelectAll(value?.length === options?.length);
              }}
              label={label}
            />
          </Box>
        </InnerShadowBox>
      )}

      {children}
    </Paper>
  );
};

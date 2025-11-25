import React from "react";
import { Divider } from "@mui/material";

import ParamsKeywordSearch from "../ParamsKeywordSearch";

const TableFilter = ({
  children,
  debounceDelay = 750,
  searchLabel = "",
  searchPlaceholder = "Search...",
  disabled = false,
}) => {
  return (
    <>
      <div className="px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="mr-auto flex flex-wrap items-center justify-between gap-4">
            {children}
          </div>

          <ParamsKeywordSearch
            label={searchLabel}
            placeholder={searchPlaceholder}
            debounceDelay={debounceDelay}
            disabled={disabled}
          />
        </div>
      </div>

      <Divider />
    </>
  );
};

export default TableFilter;

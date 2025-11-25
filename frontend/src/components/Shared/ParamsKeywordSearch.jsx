import React from "react";
import { useSearchParams } from "react-router-dom";

import ClearableTextField from "./ClearableTextField";
import { useGetUrlParams } from "../../hooks/useGetUrlParams";
import { useDebounce } from "../../hooks/useDebounce";

const ParamsKeywordSearch = ({ debounceDelay = 750, ...props }) => {
  const URL_PARAMS = useGetUrlParams();

  const [keyword, setKeyword] = React.useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { debouncedValue, isBusy } = useDebounce(keyword, debounceDelay);

  // methods
  const handleClearFilter = () => {
    delete URL_PARAMS.search;
    delete URL_PARAMS.perPage;
    setSearchParams({ ...URL_PARAMS, page: 1 });
    setKeyword("");
  };

  const handleSearchParam = (value) => {
    let newValue = value;
    //if the value contains backslash, remove it
    if (value.includes("\\")) {
      newValue = value.replace(/\\/g, "");
    }
    delete URL_PARAMS.perPage;
    setSearchParams({ ...URL_PARAMS, page: 1, search: newValue });
  };

  React.useEffect(() => {
    setKeyword(search);
  }, [search]);

  React.useEffect(() => {
    if (!debouncedValue) return;
    handleSearchParam(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <ClearableTextField
      typing={isBusy}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      handleClear={handleClearFilter}
      {...props}
    />
  );
};

export default ParamsKeywordSearch;

import React from "react";
import { useSearchParams } from "react-router-dom";

export const useGetUrlParams = () => {
  const [searchParams] = useSearchParams();

  const getURLParams = React.useCallback(() => {
    const params = {};

    for (const entry of searchParams.entries()) {
      params[entry[0]] = entry[1];
    }

    return params;
  }, [searchParams]);

  return getURLParams();
};

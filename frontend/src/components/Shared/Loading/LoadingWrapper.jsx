import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

const LoadingWrapper = ({
  children,
  loading = false,
  loadingText = "Please wait",
}) => {
  return (
    <div className="relative flex flex-grow flex-col overflow-hidden">
      {children}

      {loading && (
        <div className="z-50">
          <div className="absolute inset-0 cursor-progress bg-blue-200 bg-opacity-20 backdrop-blur-sm dark:bg-slate-600 dark:bg-opacity-20">
            <div className="flex h-full max-h-[500px] flex-col items-center justify-center">
              <CircularProgress />

              <div className="loading mt-3 font-medium dark:text-white">
                <span>{loadingText}</span> <span>. . .</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;

import React from "react";
import { twMerge } from "tailwind-merge";
import { CircularProgress } from "@mui/material";

const EventPathway = ({
  statuses = [],
  activeStatus = null,
  onChange = () => {},
  isBusy = false,
}) => {
  const [currentStatus, setCurrentStatus] = React.useState("");

  // active styles
  const handleActiveStyles = (status) => {
    const defaultStyles = "text-sm p-1 text-gray-400";
    const activeStyles =
      "px-2 py-1 text-blue-50 dark:text-gray-600 text-sm bg-blue-500 dark:bg-blue-300 dark:border-gray-500 tracking-widest rounded";

    if (!currentStatus) return defaultStyles;

    return currentStatus === status ? activeStyles : defaultStyles;
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    onChange(status);
  };

  React.useEffect(() => {
    if (!activeStatus) return;
    setCurrentStatus(activeStatus);
  }, [activeStatus]);

  return (
    <div className="flex h-8 w-full items-center justify-between py-2">
      {!isBusy ? (
        statuses.map((status, index) => (
          <React.Fragment key={index}>
            <div
              className="inline-block flex-shrink-0 cursor-pointer"
              onClick={() => handleStatusChange(status)}
            >
              <div
                className={twMerge(
                  "font-medium transition-all duration-200 ease-in",
                  handleActiveStyles(status)
                )}
              >
                {status}
              </div>
            </div>

            {index !== statuses.length - 1 && (
              <div className="w-full flex-grow border-t border-gray-300 dark:border-gray-500" />
            )}
          </React.Fragment>
        ))
      ) : (
        <div className="flex w-full justify-center">
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
};

export default EventPathway;

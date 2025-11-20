import React from "react";
import { twMerge } from "tailwind-merge";

const ActionTransition = ({
  children,
  className,
  disableAnimation = false,
}) => {
  return (
    <div
      className={twMerge(
        "absolute right-3 top-3 inline-block",
        !disableAnimation &&
          "translate-x-full opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ActionTransition;

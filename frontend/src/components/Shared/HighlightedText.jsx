import React from "react";
import { twMerge } from "tailwind-merge";

const HighlightedText = ({ text = "", highlight = "" }) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={twMerge(
            part.toLowerCase() === highlight.toLowerCase() &&
              "bg-yellow-200 dark:bg-yellow-700"
          )}
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export default HighlightedText;

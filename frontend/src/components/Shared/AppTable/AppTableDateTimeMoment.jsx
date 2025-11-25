import React from "react";
import moment from "moment";

const AppTableDateTimeMoment = ({ date, dateOnly = false }) => {
  if (!date) return "N/A";

  const dateFormatted = moment(date).format("MMM D, YYYY");
  const timeFormatted = moment(date).format("h:mm a");

  return (
    <div className="text-center">
      <div className="text-sm">{dateFormatted}</div>
      {!dateOnly && (
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {timeFormatted}
        </div>
      )}
    </div>
  );
};

export default AppTableDateTimeMoment;

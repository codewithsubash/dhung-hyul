import moment from "moment";

export const formatEventDate = (date, options = {}) => {
  const { dateOnly = false, shortFormat = false, timeOnly = false } = options;

  if (!date) return "N/A";

  if (timeOnly) {
    return moment(date).format("h:mm A");
  }

  if (dateOnly) {
    return shortFormat
      ? moment(date).format("MMM D, YYYY")
      : moment(date).format("MMMM D, YYYY");
  }

  // Full date and time
  const dateFormatted = shortFormat
    ? moment(date).format("MMM D, YYYY")
    : moment(date).format("MMMM D, YYYY");
  const timeFormatted = moment(date).format("h:mm A");

  return `${dateFormatted} at ${timeFormatted}`;
};

export const formatDateRange = (date, options = {}) => {
  const { showTime = true } = options;

  if (!date) return "N/A";

  const d = moment(date);

  return showTime
    ? d.format("MMMM D, YYYY • h:mm A")
    : d.format("MMMM D, YYYY");
};

export const getEventStatus = (startDate, endDate) => {
  const now = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  if (now.isBefore(start)) {
    return {
      label: "Upcoming",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    };
  }

  if (now.isAfter(end)) {
    return {
      label: "Completed",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    };
  }

  return {
    label: "Ongoing",
    color: "text-green-600",
    bgColor: "bg-green-100",
  };
};

export const getRegistrationStatus = (startDate, endDate) => {
  const now = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  if (!startDate || !endDate) {
    return {
      label: "Open",
      color: "text-green-600",
      bgColor: "bg-green-100",
    };
  }

  if (now.isBefore(start)) {
    return {
      label: "Not Started",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    };
  }

  if (now.isAfter(end)) {
    return {
      label: "Closed",
      color: "text-red-600",
      bgColor: "bg-red-100",
    };
  }

  return {
    label: "Open",
    color: "text-green-600",
    bgColor: "bg-green-100",
  };
};

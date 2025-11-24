import React from "react";

export function useDebounce(value, delay = 500) {
  const [isBusy, setIsBusy] = React.useState(false);

  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsBusy(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsBusy(true);
    };
  }, [value, delay]);

  return { debouncedValue, isBusy };
}

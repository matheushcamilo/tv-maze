import React from "react";

type DebounceOptions = {
  value?: string;
  delay?: number;
};

export function useDebounce({ value = "", delay = 1000 }: DebounceOptions) {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue };
}

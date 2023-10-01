import React from "react";

export function useSearchBar({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = React.useState<string>(initialValue);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return {
    value,
    onChangeText,
  };
}

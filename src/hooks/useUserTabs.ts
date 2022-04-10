import { useState } from "react";

export const useUserTabs = () => {
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return { value, handleChange}
}
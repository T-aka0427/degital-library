import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(false);

  const hasError = () => {
    setError(true);
  };
  return { hasError, error};
};
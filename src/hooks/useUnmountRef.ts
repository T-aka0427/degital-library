import { useRef, useEffect } from "react";

export const useUnmountRef = () => {
  const unmountRef = useRef<boolean>(false);

  useEffect(
    () => () => {
      unmountRef.current = true;
    },
    []
  );

  return unmountRef;
};
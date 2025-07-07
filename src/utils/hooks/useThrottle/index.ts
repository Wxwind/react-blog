import { useState, useRef, useEffect, useCallback } from "react";

export const useThrottle = (value: number | string | boolean | undefined, delay: number = 1000) => {
  const [throttled, setThrottled] = useState(value);

  const ref = useRef<number | null>(null);
  const throttledFn = useCallback(() => {
    if (ref.current) return;
    ref.current = setTimeout(() => {
      ref.current = null;
      setThrottled(value);
    }, delay);
  }, [delay, value]);

  useEffect(() => {
    throttledFn();
  }, [throttledFn]);

  return throttled;
};

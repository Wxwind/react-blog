import React, { useState, useRef, useEffect } from "react";

const useThrottle = (value: number | string | boolean | undefined, delay: number = 1000) => {
  const [throttled, setThrottled] = useState(value);

  const ref = useRef<NodeJS.Timeout | null>(null);
  const throttledFn = () => {
    if (ref.current) return;
    ref.current = setTimeout(() => {
      ref.current = null;
      setThrottled(value);
    }, delay);
  };

  useEffect(() => {
    throttledFn();
  }, [value]);

  return throttled;
};

export default useThrottle;

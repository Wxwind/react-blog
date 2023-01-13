import { useRef } from "react";

type Fn = (...args: any) => any;

// 防抖
const useThrottleFn = <T extends Fn>(fn: T, delay: number = 1000) => {
  const ref = useRef<NodeJS.Timeout | null>(null);
  return (...args: Parameters<T>) => {
    if (ref.current) return;
    ref.current = setTimeout(() => {
      ref.current = null;
      fn(args);
    }, delay);
  };
};

export default useThrottleFn;

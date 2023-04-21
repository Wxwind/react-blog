import { useRef } from "react";

type Fn = (...args: any) => any;

// 防抖
export const useThrottleFn = <T extends Fn>(fn: T, delay: number = 1000) => {
  const ref = useRef<number | null>(null);
  return (...args: Parameters<T>) => {
    if (ref.current) return;
    ref.current = window.setTimeout(() => {
      ref.current = null;
      fn(args);
    }, delay);
  };
};

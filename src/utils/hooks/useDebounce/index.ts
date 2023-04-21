import { useRef } from "react";

type Fn = (...args: any) => any;

// 防抖
export const useDebounce = <T extends Fn>(fn: T, delay: number = 500) => {
  const ref = useRef<number | null>(null);
  return (...args: Parameters<T>) => {
    if (ref.current) window.clearTimeout(ref.current);
    ref.current = window.setTimeout(fn, delay, ...args);
  };
};

// 防抖
export const debounce = <T extends Fn>(fn: T, delay = 500) => {
  let ref: number | null = null;

  return (...args: Parameters<T>) => {
    console.log(args);
    if (ref) window.clearTimeout(ref);
    ref = window.setTimeout(fn, delay, ...args);
  };
};

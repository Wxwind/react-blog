import { useRef } from "react";

type Fn = (...args: any) => any;

// 防抖
const useDebounce = <T extends Fn>(fn: T, delay: number = 500) => {
  const ref = useRef<NodeJS.Timeout | null>(null);
  return (...args: Parameters<T>) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(fn, delay, ...args);
  };
};

export default useDebounce;

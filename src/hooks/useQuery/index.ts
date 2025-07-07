import { MyResponseType } from "@/api/types";
import { useMemoizedFn } from "ahooks";
import { useState, useEffect } from "react";

/**
 * T:返回的Data类型
 */
const useQuery = <TQueryData = unknown>(
  getfn: () => Promise<MyResponseType<TQueryData>>
): [TQueryData | undefined, boolean, boolean] => {
  const [data, setData] = useState<TQueryData>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fn = useMemoizedFn(getfn);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await fn();
        setData(res.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fn]);

  return [data, isError, isLoading];
};

export default useQuery;

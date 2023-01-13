import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

/**
 * T:返回的Data类型
 */
const useQuery = <TQueryData = unknown>(url: string, getfn: () => Promise<AxiosResponse<TQueryData>>) => {
  const [data, setdata] = useState<TQueryData>();
  const [isError, setisError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setisError(false);
      setisLoading(true);
      try {
        const res = await getfn();
        setdata(res.data);
      } catch (error) {
        setisError(true);
      }
      setisLoading(false);
    };
    fetchdata();
  }, []);

  return [data, isError, isLoading];
};

export default useQuery;

import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";
import type { MyResponseType } from "@/api/types";

const serve = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

/**
 * @type Q post请求的数据类型
 * @type D 回应的消息中data的类型
 */
export const request = async <Q = unknown, D = unknown>(config: AxiosRequestConfig<Q>): Promise<MyResponseType<D>> => {
  const a = await serve.request<MyResponseType<D>, AxiosResponse<MyResponseType<D>>, Q>(config);
  const { data, meta } = a.data;
  return { data, meta };
};

export const postData = async <Q = unknown, D = unknown>(url: string, postData: Q): Promise<MyResponseType<D>> => {
  const a = await serve.post<MyResponseType<D>, AxiosResponse<MyResponseType<D>>, Q>(url, postData);
  const { data, meta } = a.data;
  return { data, meta };
};

export const getData = async <D = unknown>(url: string): Promise<MyResponseType<D>> => {
  const a = await serve.get<MyResponseType<D>>(url);
  const { data, meta } = a.data;
  return { data, meta };
};

export const putData = async <Q = unknown, D = unknown>(url: string, putData: Q): Promise<MyResponseType<D>> => {
  const a = await serve.put<MyResponseType<D>, AxiosResponse<MyResponseType<D>>, Q>(url, putData);
  const { data, meta } = a.data;
  return { data, meta };
};

export const deleteData = async <D = unknown>(url: string): Promise<MyResponseType<D>> => {
  const a = await serve.delete<MyResponseType<D>>(url);
  const { data, meta } = a.data;
  return { data, meta };
};

//请求拦截器
serve.interceptors.request.use(
  (config) => {
    console.log(`发送消息`);
    console.log(config);
    return config;
  },
  (error: any) => {
    return Promise.reject(new Error(error));
  }
);

//返回拦截器
serve.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  (response: AxiosResponse<MyResponseType<any>>) => {
    const { meta } = response.data;

    console.log(`收到消息`);
    console.log(response);
    if (meta.status === 200) {
      return response;
    } else {
      //服务器内部逻辑输出了非200的状态码
      return Promise.reject(new Error(meta.msg));
    }
  },
  //超出 2xx 范围的状态码都会触发该函数
  (error: any) => {
    return Promise.reject(new Error(error.message));
  }
);

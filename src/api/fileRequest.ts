import axios from "axios";

const serve = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_File,
  timeout: 5000,
});

/**
 * @type D 回应的消息中data的类型
 */
export const getFile = async <D = string>(url: string): Promise<D> => {
  const a = await serve.get<D>(url);
  return a.data;
};

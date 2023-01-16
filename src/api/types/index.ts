export * from "./articles";
export type MyResponseType<T> = {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
};

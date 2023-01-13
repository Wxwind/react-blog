export interface MyResponseType<T> {
  meta: {
    status: number;
    msg: string;
  };
  data: T;
}

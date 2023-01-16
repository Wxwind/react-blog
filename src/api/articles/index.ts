import { getData } from "../request";
import { getArticleListResp, getArticleFileURLResp } from "@/api/types";
export const getArticleList = () => {
  return getData<getArticleListResp>("/articles");
};

export const getArticleFileURL = (articleId: number) => {
  return getData<getArticleFileURLResp>(`/articles/${articleId}`);
};

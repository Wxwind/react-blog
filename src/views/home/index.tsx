import React, { useState, useEffect, useRef } from "react";
import PostPreview from "./components/PostPreview";
import styles from "./styles.module.scss";
import useQuery from "@/utils/hooks/useQuery";
import { getArticleList } from "@/api/articles";
import Loading from "@/common/components/Loading";

// type articlePreview = {
//   title: string;
//   particleId: number;
//   imageURL: string;
//   desc: string;
//   publishTime: string;
// };

const Home = () => {
  // const [articleList, setarticleList] = useState<articlePreview[]>([
  //   { title: "在vue3+ts+vite中使用svg图片", particleId: 1, imageURL: img1, desc: "hello", publishTime: "2022-11-17" },
  //   { title: "456", particleId: 2, imageURL: img2, desc: "hellodaswawfawgawfawgawesg", publishTime: "2021-09-06" },
  // ]);

  const [data, isError, isLoading] = useQuery(getArticleList);

  return (
    <div>
      {/*Header*/}
      <div className={styles.header}>
        <h1 className={styles.title}>微夏丿风的个人空间</h1>
        <div className={styles.bgImage}></div>
      </div>
      {/*Content*/}
      <div className={styles.content}>
        {/*Posts Preview*/}
        <div className={styles.postsPreviw}>
          {isError ? (
            <div>加载文章出错，请刷新页面重试</div>
          ) : isLoading ? (
            <Loading />
          ) : (
            data?.map((article) => (
              <PostPreview
                particleId={article.particleId}
                imageURL={article.imageURL}
                title={article.title}
                desc={article.desc}
                publishTime={article.publishTime}
                key={article.particleId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from "react";
import PostPreview from "./components/PostPreview";
import styles from "./styles.module.scss";
import useQuery from "@/utils/hooks/useQuery";
import { getArticleList } from "@/api/articles";
import Loading from "@/common/components/Loading";

const Home = () => {
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
                particleId={article.articleId}
                imageURL={article.imageURL}
                title={article.title}
                desc={article.desc}
                publishTime={article.publishTime}
                key={article.articleId}
              />
            ))
          )}
        </div>
      </div>
      {/*ICP*/}
      <div className={styles.icp}>
        <a href="http://beian.miit.gov.cn/" className={styles.icphref}>
          浙ICP备2023001363号-1
        </a>
      </div>
    </div>
  );
};

export default Home;

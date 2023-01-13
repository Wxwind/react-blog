import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { marked } from "marked";
import MarkdownNavbar from "markdown-navbar";
import CardAuthInfo from "./components/CardAuthInfo";
import "github-markdown-css/github-markdown.css";
import "./markdown.css";

const articles = new Map([
  ["1", "/posts/PBR光照计算公式介绍.md"],
  ["2", "/posts/在vue3-ts-vite中使用svg图片.md"],
]);

const Article = () => {
  const { articleId } = useParams();
  const [currentArticle, setcurrentArticle] = useState("");
  const tocRef = useRef(null);
  if (articleId === undefined) return <>404 not found</>;
  const fileURL = articles.get(articleId);
  if (fileURL) {
    const getArticle = async (fileURL: string) => {
      const res = await fetch(fileURL);
      const text = await res.text();
      setcurrentArticle(text);
    };

    getArticle(fileURL);
  }

  const htmlContent = marked.parse(currentArticle);
  return (
    <div className={styles.header}>
      <main className={styles.layout}>
        <div className={styles.post}>
          <article
            className={`${styles.markdownBody} markdown-body `}
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          ></article>
        </div>
        <div className={styles.asideContent} ref={tocRef}>
          <CardAuthInfo />

          <div className={styles.stickyCardToc}>
            <div className={styles.cardTocTitle}>目录</div>
            <MarkdownNavbar source={currentArticle} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Article;

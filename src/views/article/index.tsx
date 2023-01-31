import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import React, { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import MarkdownNavbar from "markdown-navbar";
import CardAuthInfo from "./components/CardAuthInfo";
import { getArticleFileURL } from "@/api/articles";
import "github-markdown-css/github-markdown.css";
import "./markdown.css";
import axios from "axios";

const Article = () => {
  const { articleId } = useParams();
  const [currentArticle, setcurrentArticle] = useState("");
  const tocRef = useRef(null);

  useEffect(() => {
    const getfile = async () => {
      if (articleId === undefined) return;
      let n = parseInt(articleId);
      if (Number.isNaN(n)) return;
      const res = await getArticleFileURL(n);
      if (res.data) {
        const fileURL = "/fileServer" + res.data;

        const file = await axios.get<string>(fileURL);
        const text = await file.data;
        setcurrentArticle(text);
      }
    };

    getfile();
  }, [articleId]);

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

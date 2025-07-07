import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import MarkdownNavbar from "markdown-navbar";
import { CardAuthInfo } from "./components/CardAuthInfo";
import { getArticleFileURL } from "@/api/articles";
import "github-markdown-css/github-markdown.css";
import "./markdown.css";
import { getFile } from "@/api/fileRequest";

export default function Article() {
  const { articleId } = useParams();
  const [currentArticle, setCurrentArticle] = useState("");
  const tocRef = useRef(null);

  useEffect(() => {
    const getfileData = async () => {
      if (articleId === undefined) return;
      const n = parseInt(articleId);
      if (Number.isNaN(n)) return;
      const res = await getArticleFileURL(n);
      if (res.data) {
        const text = await getFile(res.data);
        setCurrentArticle(text);
      }
    };

    getfileData();
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
}

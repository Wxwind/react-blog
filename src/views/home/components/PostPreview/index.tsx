import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

type props = {
  title: string;
  particleId: number;
  imageURL: string;
  desc: string;
  publishTime: string;
};

const getParticleUrl = (particleId: number) => {
  return `/article/${particleId}`;
};

function PostPreview({ title, particleId, imageURL, desc, publishTime }: props) {
  const url = getParticleUrl(particleId);

  return (
    <div className={styles.postPreview}>
      <Link to={url} className={styles.imageLink}>
        <img src={imageURL} alt={"loading"} className={styles.postImage}></img>
      </Link>
      <div className={styles.postInfo}>
        <Link to={url} className={styles.postTitle}>
          {title}
        </Link>
        <div className={styles.postMeta}>发表于 {publishTime}</div>
        <div className={styles.postDesc}>{desc}</div>
      </div>
    </div>
  );
}

export default PostPreview;

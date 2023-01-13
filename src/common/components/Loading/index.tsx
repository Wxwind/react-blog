import React from "react";
import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};

export default Loading;

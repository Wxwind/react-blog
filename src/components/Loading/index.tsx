import styles from "./styles.module.scss";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}

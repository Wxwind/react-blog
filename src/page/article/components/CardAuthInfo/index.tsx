import styles from "./styles.module.scss";
import avatarImg from "@/assets/images/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function CardAuthInfo() {
  return (
    <div className={styles.cardAuthInfo}>
      <div>
        <img src={avatarImg} alt="avatar" className={styles.avatarImg} />
        <div className={styles.authorName}>微夏丿风</div>
      </div>
      <a href="https://github.com/Wxwind" className={styles.button}>
        <FontAwesomeIcon icon={faGithub} className={styles.faIcon} />
        <span className={styles.buttonText}>Github</span>
      </a>
    </div>
  );
}

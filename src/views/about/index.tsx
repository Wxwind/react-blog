import styles from "./styles.module.scss";
import ResumeContent from "./components/ResumeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
const resumeURL = "https://assets.wxwind.top/static/resume/resume.pdf";

const About = () => {
  return (
    <div className={styles.bgImage}>
      <div className={styles.download}>
        <a target="_blank" rel="noopener noreferrer" href={resumeURL}>
          <FontAwesomeIcon icon={faFileArrowDown} />
          <span style={{ padding: "0px 5px" }}>下载 PDF</span>
        </a>
      </div>
      <div className={styles.resume}>
        <ResumeContent />
      </div>
    </div>
  );
};

export default About;

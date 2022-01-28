import styles from "./styles.module.css";

const KeywordBox = () => {
  return (
    <div className={styles.KeywordBox}>
      <div className={styles.keyword}>Easy</div>
      <div className={styles.keyword}>Simple</div>
      <div className={styles.keyword}>Blog Service</div>
    </div>
  );
};

export default KeywordBox;
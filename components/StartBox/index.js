import Link from 'next/link';
import styles from './styles.module.css';

const StartBox = () => {
  return (
    <section className={styles.StartBox}>
      <h2 className={styles.content}>
        쉽고 간단한 블로그 서비스,
        <br />
        Easy Log를 만나보세요.
      </h2>
      <Link href='/signup'>
          <a className={styles.signUpBtn}>시작하기</a>
      </Link>
    </section>
  );
};

export default StartBox;

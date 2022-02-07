import Link from 'next/link';
import styles from './styles.module.css';

const LoginForm = () => {
  return (
    <section className={styles.LoginForm}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>Easy Log</a>
        </Link>
        <h2>로그인</h2>
      </header>
      <form>
        <div className={styles.item}>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" required />
        </div>
        <div className={styles.item}>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" required />
        </div>
        <button className={styles.loginBtn}>로그인</button>
        <div className={styles.linkToSignUp}>
          <span>아직 계정이 없으신가요?</span>
          <Link href="/signup">
            <a>계정 만들기</a>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

import Image from 'next/image';
import Link from 'next/link'
import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <Image src="/logo.png" height={32} width={32} />
        <h1>
          <Link href="/">
            <a className={styles.title}>Easy Log</a>
          </Link>
        </h1>
      </div>
      <Link href="/login">
        <a className={styles.loginBtn}>로그인</a>
      </Link>
    </header>
  );
};

export default Header;
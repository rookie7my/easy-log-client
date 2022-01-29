import Image from "next/image";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <Image src="/logo.png" height={32} width={32} />
        <h1 className={styles.title}>Easy Log</h1>
      </div>
      <button>로그인</button>
    </header>
  );
};

export default Header;
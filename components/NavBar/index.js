import Image from "next/image";
import styles from "./styles.module.css";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <div className={styles.logo}>
        <Image src="/logo.png" height={32} width={32} />
        <span className={styles.title}>Easy Log</span>
      </div>
      <button>로그인</button>
    </nav>
  );
};

export default NavBar;
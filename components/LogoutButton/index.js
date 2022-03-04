import { useCallback } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import styles from './styles.module.css';

const LogoutButton = () => {
  const onLogoutClicked = useCallback( () => {
      console.log('logged out successfully');
  }, []);

  return (
    <button onClick={onLogoutClicked} className={styles.LogoutButton}>
      <span>로그아웃</span>
      <BsBoxArrowRight />
    </button>
  );
};

export default LogoutButton;

import { useCallback, useState } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { logout } from '../../reducers/currentUserSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [logoutRequestStatus, setLogoutRequestStatus] = useState('idle');

  const onLogoutClicked = useCallback(async () => {
    if(logoutRequestStatus === 'loading') {
      return;
    }
    try {
      setLogoutRequestStatus('loading');
      await dispatch(logout()).unwrap();
      console.log('logged out successfully');
    } catch (err) {
      setLogoutRequestStatus('idle');
      console.error(err.message);
    }
  }, [logoutRequestStatus]);

  return (
    <button onClick={onLogoutClicked} className={styles.LogoutButton}>
      <span>로그아웃</span>
      <BsBoxArrowRight />
    </button>
  );
};

export default LogoutButton;

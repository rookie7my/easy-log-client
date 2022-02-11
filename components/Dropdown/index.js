import { useCallback, useEffect, useRef, useState } from 'react';
import { BsGear, BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';
import LogoutButton from '../LogoutButton';

const Dropdown = ({name}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onPageClicked = (e) => {
      if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(prevState => !prevState);
      }
    };

    if(isActive) {
      document.addEventListener('click', onPageClicked);
    }

    return () => {
      document.removeEventListener('click', onPageClicked);
    }
  }, [isActive]);

  const onToggleBtnClicked = useCallback(() => {
    setIsActive(prevState => !prevState);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.Dropdown}>
      <button className={styles.toggleBtn} onClick={onToggleBtnClicked}>
        {name}
      </button>
      <nav className={`${styles.menuList} ${isActive? styles.active : ''}`}>
        <ul>
          <li className={styles.menuItem}>
            <button className={styles.menuBtn}>
              <span>계정 관리</span>
              <BsGear />
            </button>
          </li>
          <li className={styles.menuItem}>
            <button className={styles.menuBtn}>
              <span>글쓰기</span>
              <BsPencil />
            </button>
          </li>
          <li className={styles.menuItem}>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dropdown;

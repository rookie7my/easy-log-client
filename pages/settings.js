import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import styles from '../styles/settings.module.css';

const Settings = () => {
  const router = useRouter();
  const currentUser = useSelector(state => state.currentUser.data);

  useEffect(() => {
    if(!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);
  
  if(!currentUser) {
    return null;
  }

  return (
    <>
      <Header />
      <main className={styles.Settings}>
        <h2 className={styles.title}>설정</h2>
        <section className={styles['setting-group']}>
          <h3 className={styles.subtitle}>기본 설정</h3>
          <div className={styles['menu-item']}>
            <div>sample name</div>
            <button>유저 이름 변경하기</button>
          </div>
          <div className={styles['menu-item']}>
            <div>sample@email.com</div>
            <button>이메일 변경하기</button>
          </div>
          <div className={styles['menu-item']}>
            <div>비밀번호: ********</div>
            <button>비밀번호 변경하기</button>
          </div>
        </section>
        <section className={styles['setting-group']}>
          <h3 className={styles.subtitle}>소개</h3>
          <div>
            <div className={styles['menu-item']}>
              <div>1줄 소개</div>
              <button>1줄 소개 변경하기</button>
            </div>
            <div>아직 1줄 소개가 작성되지 않았습니다</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Settings;

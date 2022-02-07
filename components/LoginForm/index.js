import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { login } from '../../reducers/currentUserSlice';

const LoginForm = () => {
  const loginRequestStatus = useSelector(state => state.currentUser.loginRequestStatus);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChanged = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onPasswordChanged = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onFormSubmitted = useCallback((e) => {
    e.preventDefault();
    if(!email || !password) {
      return;
    }
    if(loginRequestStatus === 'loading' || loginRequestStatus === 'succeeded') {
      return;
    }
    dispatch(login({email, password}));
  }, [email, password, loginRequestStatus, dispatch]);

  return (
    <section className={styles.LoginForm}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>Easy Log</a>
        </Link>
        <h2>로그인</h2>
      </header>
      <form onSubmit={onFormSubmitted}>
        <div className={styles.item}>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" required
                 value={email} onChange={onEmailChanged}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" required
                 value={password} onChange={onPasswordChanged}
          />
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

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { login } from '../../reducers/currentUserSlice';
import FormMessage from "../FormMessage";
import Modal from '../Modal';

const LoginForm = () => {
  const loginRequestStatus = useSelector(state => state.currentUser.loginRequestStatus);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessageModal, setErrorMessageModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    field: '',
    errorMessage: '',
  });

  const onModalClosed = useCallback(() => {
    setErrorMessageModal(false);
  }, []);

  const onEmailChanged = useCallback((e) => {
    setEmail(e.target.value);
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage({
        field: '',
        errorMessage: '',
      });
    }
  }, [errorMessage]);

  const onPasswordChanged = useCallback((e) => {
    setPassword(e.target.value);
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage({
        field: '',
        errorMessage: '',
      });
    }
  }, [errorMessage]);

  const onFormSubmitted = useCallback((e) => {
    e.preventDefault();
    if(!email) {
      setErrorMessage({
        field: 'email',
        errorMessage: '이메일을 입력해주세요'
      });
      setErrorMessageModal(true);
      return;
    }
    if(!password) {
      setErrorMessage({
        field: 'password',
        errorMessage: '비밀번호를 입력해주세요'
      });
      setErrorMessageModal(true);
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
          <input id="email" type="text"
                 value={email} onChange={onEmailChanged}
          />
          {errorMessage.field === 'email' &&
            <FormMessage isActive>
              {errorMessage.errorMessage}
            </FormMessage>
          }
        </div>
        <div className={styles.item}>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password"
                 value={password} onChange={onPasswordChanged}
          />
          {errorMessage.field === 'password' &&
            <FormMessage isActive>
              {errorMessage.errorMessage}
            </FormMessage>
          }
        </div>
        <button className={styles.loginBtn}>로그인</button>
        <div className={styles.linkToSignUp}>
          <span>아직 계정이 없으신가요?</span>
          <Link href="/signup">
            <a>계정 만들기</a>
          </Link>
        </div>
      </form>
      {errorMessageModal &&
        <Modal title="로그인 실패"
               content={errorMessage.errorMessage}
               onModalClosed={onModalClosed}
        />
      }
    </section>
  );
};

export default LoginForm;

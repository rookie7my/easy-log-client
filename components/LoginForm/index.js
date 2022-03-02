import styles from './styles.module.css';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { login } from '../../reducers/currentUserSlice';
import FormMessage from "../FormMessage";
import Modal from '../Modal';
import useValidatedFormFields, {FORM_FIELD_ERROR_TYPE} from '../../hooks/useValidatedFormFields';

const errorMessages = {
  email: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '이메일을 입력해주세요'
  },
  password: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '비밀번호를 입력해주세요'
  }
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginRequestStatus, setLoginRequestStatus] = useState('idle');

  const { fieldValues, onFieldValueChanged, onFormSubmitted, getFieldError } = useValidatedFormFields({
    email: '',
    password: '',
  }, errorMessages);

  const [errorMessageOnModal, setErrorMessageOnModal] = useState('');

  const onModalCloseButtonClicked = useCallback(() => {
    setErrorMessageOnModal('');
  }, []);

  const onLoginFormSubmitted = onFormSubmitted(
    async fieldValues => {
      if(loginRequestStatus === 'loading') {
        return;
      }
      try {
        setLoginRequestStatus('loading');
        await dispatch(login({ email: fieldValues.email, password: fieldValues.password })).unwrap();
        console.log('logged in successfully');
        router.push('/');
      } catch(err) {
        setErrorMessageOnModal('이메일 또는 비밀번호가 유효하지 않습니다');
      } finally {
        setLoginRequestStatus('idle');
      }
    },
    ({ fieldError }) => {
      setErrorMessageOnModal(fieldError[0].errorMessage);
    }
  );

  const fieldError = {
    email: getFieldError('email'),
    password: getFieldError('password')
  };

  return (
    <section className={styles.LoginForm}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>Easy Log</a>
        </Link>
        <h2>로그인</h2>
      </header>
      <form noValidate onSubmit={onLoginFormSubmitted}>
        <div className={styles.item}>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" name="email"
                 required
                 value={fieldValues.email} onChange={onFieldValueChanged}
          />
          {fieldError.email.length > 0 &&
            <FormMessage isActive>
              {fieldError.email[0].errorMessage}
            </FormMessage>
          }
        </div>
        <div className={styles.item}>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" name="password"
                 required
                 value={fieldValues.password} onChange={onFieldValueChanged}
          />
          {fieldError.password.length > 0 &&
            <FormMessage isActive>
              {fieldError.password[0].errorMessage}
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
      {errorMessageOnModal &&
        <Modal title="로그인 실패"
               content={errorMessageOnModal}
               onModalClosed={onModalCloseButtonClicked}
        />
      }
    </section>
  );
};

export default LoginForm;

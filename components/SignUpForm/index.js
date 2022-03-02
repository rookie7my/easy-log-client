import styles from './styles.module.css';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

import FormMessage from '../FormMessage';
import Modal from '../Modal';
import useValidatedFormFields, { FORM_FIELD_ERROR_TYPE } from '../../hooks/useValidatedFormFields';

const PASSWORD_AND_PASSWORD_CHECK_DIFFERENT = 'passwordAndPasswordCheckDifferent';

const errorMessages = Object.freeze({
  username: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '유저 이름을 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.TOO_SHORT]: '유저 이름을 2자 이상 30자 이하로 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.TOO_LONG]: '유저 이름을 2자 이상 30자 이하로 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.PATTERN_MISMATCH]: '유저 이름을 영문 대소문자/숫자/한글/언더바(_)/하이픈(-)만을 이용해 입력해주세요'
  },
  email: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '이메일을 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.TYPE_MISMATCH]: '이메일 형식에 맞게 입력해주세요'
  },
  password: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '비밀번호를 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.TOO_SHORT]: '비밀번호를 8자 이상 32자 이하로 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.TOO_LONG]: '비밀번호를 8자 이상 32자 이하로 입력해주세요',
    [FORM_FIELD_ERROR_TYPE.PATTERN_MISMATCH]: '비밀번호에 영문 대소문자/숫자/특수문자 각각 적어도 1자 이상씩 포함해주세요'
  },
  passwordCheck: {
    [FORM_FIELD_ERROR_TYPE.VALUE_MISSING]: '비밀번호 확인을 입력해주세요',
    [PASSWORD_AND_PASSWORD_CHECK_DIFFERENT]: '비밀번호와 비밀번호 확인이 일치하지 않습니다'
  }
});

const SignUpForm = () => {
  const router = useRouter();

  const [errorMessageOnModal, setErrorMessageOnModal] = useState('');

  const onCloseButtonClicked = useCallback(() => {
    setErrorMessageOnModal('');
  }, []);

  const { fieldValues, onFieldValueChanged, onFormSubmitted, getFieldError } = useValidatedFormFields({
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
  }, errorMessages, {
    passwordCheck: {
      [PASSWORD_AND_PASSWORD_CHECK_DIFFERENT]: fieldValues => fieldValues.password === fieldValues.passwordCheck
    }
  });

  const onSignUpFormSubmitted = onFormSubmitted(
     async fieldValues => {
        const { username, email, password } = fieldValues;
        try {
          const response = await axios.post('/api/users', { username, email, password });
          router.push('/');
        } catch (error) {
          console.log(error);
        }
     },
    mainFieldError => {
       setErrorMessageOnModal(mainFieldError.fieldError[0].errorMessage);
    }
  );

  const fieldError = {
    username: getFieldError('username'),
    email: getFieldError('email'),
    password: getFieldError('password'),
    passwordCheck: getFieldError('passwordCheck')
  };

  return (
    <form noValidate className={styles.SignUpForm} onSubmit={onSignUpFormSubmitted}>
      <div className={styles.title}>
        <Link href="/">
          <a className={styles.appName}>Easy Log</a>
        </Link>
        <h1>계정 만들기</h1>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-name">유저 이름</label>
        <input type="text" id="user-name" name="username" value={fieldValues.username} placeholder="유저 이름"
               onChange={onFieldValueChanged}
               required minLength={2} maxLength={30}
               pattern="^[ㄱ-ㅎ가-힣\w-]+$"
        />
        {fieldError.username.length > 0 &&
          <FormMessage isActive>
            {fieldError.username[0].errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-email">이메일</label>
        <input type="email" id="user-email" name="email" value={fieldValues.email} placeholder="example@easylog.com"
               onChange={onFieldValueChanged}
               required
        />
        {fieldError.email.length > 0 &&
          <FormMessage isActive>
            {fieldError.email[0].errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password">비밀번호</label>
        <input type="password" id="user-password" name="password" value={fieldValues.password} placeholder="비밀번호"
               onChange={onFieldValueChanged}
               required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$"
               minLength={8} maxLength={32}
        />
        {fieldError.password.length > 0 &&
          <FormMessage isActive>
            {fieldError.password[0].errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <input type="password" id="user-password-check" name="passwordCheck" placeholder="비밀번호 확인"
               value={fieldValues.passwordCheck} onChange={onFieldValueChanged}
               required />
        {fieldError.passwordCheck.length > 0 &&
          <FormMessage isActive>
            {fieldError.passwordCheck[0].errorMessage}
          </FormMessage>
        }
      </div>
      <button type="submit">
        계정 만들기
      </button>
      <div className={styles.terms}>
        가입 시, Easy Log의 <strong>이용약관</strong>에 동의합니다.
      </div>
      {errorMessageOnModal &&
        <Modal title="계정 만들기 실패" content={errorMessageOnModal} onModalClosed={onCloseButtonClicked} />
      }
    </form>
  );
};

export default SignUpForm;

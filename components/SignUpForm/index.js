import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import FormMessage from '../FormMessage';
import Modal from '../Modal';

const ERROR_TYPE = Object.freeze({
  PATTERN_MISMATCH: 'patternMismatch',
  TOO_LONG: 'tooLong',
  TOO_SHORT: 'tooShort',
  TYPE_MISMATCH: 'typeMismatch',
  VALUE_MISSING: 'valueMissing',
});

const errorMessages = Object.freeze({
  username: {
    [ERROR_TYPE.VALUE_MISSING]: '유저 이름을 입력해주세요',
    [ERROR_TYPE.TOO_SHORT]: '유저 이름을 2자 이상 30자 이하로 입력해주세요',
    [ERROR_TYPE.TOO_LONG]: '유저 이름을 2자 이상 30자 이하로 입력해주세요',
    [ERROR_TYPE.PATTERN_MISMATCH]: '유저 이름을 영문 대소문자/숫자/한글/언더바(_)/하이픈(-)만을 이용해 입력해주세요'
  },
  email: {
    [ERROR_TYPE.VALUE_MISSING]: '이메일을 입력해주세요',
    [ERROR_TYPE.TYPE_MISMATCH]: '이메일 형식에 맞게 입력해주세요'
  },
  password: {
    [ERROR_TYPE.VALUE_MISSING]: '비밀번호를 입력해주세요',
    [ERROR_TYPE.TOO_SHORT]: '비밀번호를 8자 이상 32자 이하로 입력해주세요',
    [ERROR_TYPE.TOO_LONG]: '비밀번호를 8자 이상 32자 이하로 입력해주세요',
    [ERROR_TYPE.PATTERN_MISMATCH]: '비밀번호에 영문 대소문자/숫자/특수문자 각각 적어도 1자 이상씩 포함해주세요'
  },
  passwordCheck: {
    [ERROR_TYPE.VALUE_MISSING]: '비밀번호 확인을 입력해주세요',
  }
});

function getValidationResult(field, validity=null) {
  const errorTypes = Object.keys(errorMessages[field]);
  const validationResult = {};
  if(!validity) {
    errorTypes.forEach((errorType) => validationResult[errorType] = false);
    validationResult[ERROR_TYPE.VALUE_MISSING] = true;
    return validationResult;
  }
  errorTypes.forEach((errorType) => validationResult[errorType] = validity[errorType]);
  return validationResult;
}

function getErrorMessageFromValidationResults(validationResults) {
  for (const field in validationResults) {
    const validationResult = validationResults[field];
    for(const errorType in validationResult) {
      if(validationResult[errorType]) {
        return {
          field,
          errorMessage: errorMessages[field][errorType]
        };
      }
    }
  }
  return null;
}

const emptyErrorMessage = {
  field: '',
  errorMessage: '',
};

const SignUpForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [usernameValidationResult, setUsernameValidationResult] = useState(getValidationResult('username'));

  const [email, setEmail] = useState('');
  const [emailValidationResult, setEmailValidationResult] = useState(getValidationResult('email'));

  const [password, setPassword] = useState('');
  const [passwordValidationResult, setPasswordValidationResult] = useState(getValidationResult('password'));

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckValidationResult, setPasswordCheckValidationResult] = useState(getValidationResult('passwordCheck'));

  const [errorMessageModal, setErrorMessageModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState(emptyErrorMessage);

  const onErrorMessageModalClosed = useCallback(() => {
    setErrorMessageModal(false);
  }, []);

  const onUsernameChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setUsername(value);
    setUsernameValidationResult(getValidationResult('username', validity));
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage(emptyErrorMessage);
    }
  }, [errorMessage]);

  const onEmailChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setEmail(value);
    setEmailValidationResult(getValidationResult('email', validity));
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage(emptyErrorMessage);
    }
  }, [errorMessage]);

  const onPasswordChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setPassword(value);
    setPasswordValidationResult(getValidationResult('password', validity));
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage(emptyErrorMessage);
    }
  }, [errorMessage]);

  const onPasswordCheckChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setPasswordCheck(value);
    setPasswordCheckValidationResult(getValidationResult('passwordCheck', validity));
    if(errorMessage.field || errorMessage.errorMessage) {
      setErrorMessage(emptyErrorMessage);
    }
  }, [errorMessage]);

  const onFormSubmitted = useCallback((e) => {
    console.log('[signUpForm submit event]');
    e.preventDefault();
    let errorMessage = getErrorMessageFromValidationResults(
      {
        'username': usernameValidationResult,
        'email': emailValidationResult,
        'password': passwordValidationResult,
        'passwordCheck': passwordCheckValidationResult
      }
    );
    if(errorMessage) {
      setErrorMessageModal(true);
      setErrorMessage(errorMessage);
      return;
    }
    if(password !== passwordCheck) {
      errorMessage = {
        field: 'passwordCheck',
        errorMessage: '비밀번호와 비밀번호 확인이 일치하지 않습니다'
      };
      setErrorMessageModal(true);
      setErrorMessage(errorMessage);
      return;
    }
    console.log('form submitted successfully');
    router.push('/');
  }, [
    password,
    passwordCheck,
    usernameValidationResult,
    emailValidationResult,
    passwordValidationResult,
    passwordCheckValidationResult
  ]);

  return (
    <form noValidate className={styles.SignUpForm} onSubmit={onFormSubmitted}>
      <div className={styles.title}>
        <Link href="/">
          <a className={styles.appName}>Easy Log</a>
        </Link>
        <h1>계정 만들기</h1>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-name">유저 이름</label>
        <input type="text" id="user-name" name="username" value={username} placeholder="유저 이름"
               onChange={onUsernameChanged}
               required minLength={2} maxLength={30}
               pattern="^[ㄱ-ㅎ가-힣\w-]+$"
        />
        {errorMessage.field === 'username' &&
          <FormMessage isActive>
            {errorMessage.errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-email">이메일</label>
        <input type="email" id="user-email" name="email" value={email} placeholder="example@easylog.com"
               onChange={onEmailChanged}
               required
        />
        {errorMessage.field === 'email' &&
          <FormMessage isActive>
            {errorMessage.errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password">비밀번호</label>
        <input type="password" id="user-password" name="password" value={password} placeholder="비밀번호"
               onChange={onPasswordChanged}
               required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$"
               minLength={8} maxLength={32}
        />
        {errorMessage.field === 'password' &&
          <FormMessage isActive>
            {errorMessage.errorMessage}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <input type="password" id="user-password-check" name="passwordCheck" placeholder="비밀번호 확인"
               value={passwordCheck} onChange={onPasswordCheckChanged}
               required />
        {errorMessage.field === 'passwordCheck' &&
          <FormMessage isActive>
            {errorMessage.errorMessage}
          </FormMessage>
        }
      </div>
      <button type="submit">
        계정 만들기
      </button>
      <div className={styles.terms}>
        가입 시, Easy Log의 <strong>이용약관</strong>에 동의합니다.
      </div>
      {errorMessageModal &&
        <Modal title='계정 만들기 실패' content={errorMessage.errorMessage}
               onModalClosed={onErrorMessageModalClosed} />
      }
    </form>
  );
};

export default SignUpForm;
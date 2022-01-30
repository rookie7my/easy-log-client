import styles from './styles.module.css';
import {useCallback, useState} from "react";
import FormMessage from "../FormMessage";

const ERROR_TYPE = Object.freeze({
  PATTERN_MISMATCH: 'patternMismatch',
  TOO_LONG: 'tooLong',
  TOO_SHORT: 'tooShort',
  TYPE_MISMATCH: 'typeMismatch',
  VALUE_MISSING: 'valueMissing',
});

const errorMessages = {
  username: {
    [ERROR_TYPE.VALUE_MISSING]: '유저 이름을 입력해주세요',
    [ERROR_TYPE.TOO_SHORT]: '2자 이상 30자 이하로 입력해주세요',
    [ERROR_TYPE.TOO_LONG]: '2자 이상 30자 이하로 입력해주세요',
    [ERROR_TYPE.PATTERN_MISMATCH]: '영문 대소문자/숫자/한글/언더바(_)/하이픈(-)을 이용해 유저 이름을 입력해주세요'
  },
  email: {
    [ERROR_TYPE.VALUE_MISSING]: '이메일을 입력해주세요',
    [ERROR_TYPE.TYPE_MISMATCH]: '이메일 형식에 맞게 입력해주세요'
  },
  password: {
    [ERROR_TYPE.VALUE_MISSING]: '비밀번호를 입력해주세요',
    [ERROR_TYPE.TOO_SHORT]: '8자 이상 32자 이하로 입력해주세요',
    [ERROR_TYPE.TOO_LONG]: '8자 이상 32자 이하로 입력해주세요',
    [ERROR_TYPE.PATTERN_MISMATCH]: '영문 대소문자/숫자/특수문자 각각 적어도 1자 이상씩 포함해주세요'
  },
  passwordCheck: {
    [ERROR_TYPE.VALUE_MISSING]: '비밀번호 확인을 입력해주세요',
  }
};

function getValidationResult(field, validity=null) {
  const errorTypes = Object.keys(errorMessages[field]);
  const validationResult = {};
  if(!validity) {
    errorTypes.forEach((errorType) => validationResult[errorType] = false);
    return validationResult;
  }
  errorTypes.forEach((errorType) => validationResult[errorType] = validity[errorType]);
  return validationResult;
}

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [usernameValidationResult, setUsernameValidationResult] = useState(getValidationResult('username'));

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailValidationResult, setEmailValidationResult] = useState(getValidationResult('email'));

  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordValidationResult, setPasswordValidationResult] = useState(getValidationResult('password'));

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckValidationResult, setPasswordCheckValidationResult] = useState(getValidationResult('passwordCheck'));

  const onUsernameChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setUsername(value);
    setUsernameValidationResult(getValidationResult('username', validity));
  }, []);

  const onUsernameFocused = useCallback(() => {
    setIsUsernameFocused(true);
  }, []);

  const onUsernameBlured = useCallback(()=> {
    setIsUsernameFocused(false);
  }, []);

  const onEmailChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setEmail(value);
    setEmailValidationResult(getValidationResult('email', validity));
  }, []);

  const onEmailFocused = useCallback(()=> {
    setIsEmailFocused(true);
  }, []);

  const onEmailBlured = useCallback(() => {
    setIsEmailFocused(false);
  }, []);

  const onPasswordChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setPassword(value);
    setPasswordValidationResult(getValidationResult('password', validity));
  }, []);

  const onPasswordFocused = useCallback(()=> {
    setIsPasswordFocused(true);
  }, []);

  const onPasswordBlured = useCallback(() => {
    setIsPasswordFocused(false);
  }, []);

  const onPasswordCheckChanged = useCallback((e) => {
    const {value, validity} = e.target;
    setPasswordCheck(value);
    setPasswordCheckValidationResult(getValidationResult('passwordCheck', validity));
  }, []);

  const onInvalid = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onFormSubmitted = useCallback((e) => {
    e.preventDefault();
    console.log('form submit event');
    if(password !== passwordCheck) {
      console.log('password and passwordCheck are different');
      return;
    }
    console.log('form submitted successfully');
  }, [password, passwordCheck]);

  return (
    <form className={styles.SignUpForm} onSubmit={onFormSubmitted}>
      <div className={styles.title}>
        <span className={styles.appName}>Easy Log</span>
        <h1>계정 만들기</h1>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-name">유저 이름</label>
        <input type="text" id="user-name" name="username" value={username} placeholder="유저 이름"
               onChange={onUsernameChanged}
               onFocus={onUsernameFocused}
               onBlur={onUsernameBlured}
               onInvalid={onInvalid}
               required minLength={2} maxLength={30}
               pattern="^[ㄱ-ㅎ가-힣\w-]+$"
        />
        {isUsernameFocused &&
          <>
            <FormMessage isActive={usernameValidationResult[ERROR_TYPE.PATTERN_MISMATCH]}>
              {errorMessages.username[ERROR_TYPE.PATTERN_MISMATCH]}
            </FormMessage>
            <FormMessage
              isActive={usernameValidationResult[ERROR_TYPE.TOO_SHORT] || usernameValidationResult[ERROR_TYPE.TOO_LONG]}>
              {errorMessages.username[ERROR_TYPE.TOO_SHORT]}
            </FormMessage>
          </>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-email">이메일</label>
        <input type="email" id="user-email" name="email" value={email} placeholder="example@easylog.com"
               onChange={onEmailChanged}
               onFocus={onEmailFocused}
               onBlur={onEmailBlured}
               onInvalid={onInvalid}
               required
        />
        {isEmailFocused &&
          <FormMessage isActive={emailValidationResult[ERROR_TYPE.TYPE_MISMATCH]}>
            {errorMessages.email[ERROR_TYPE.TYPE_MISMATCH]}
          </FormMessage>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password">비밀번호</label>
        <input type="password" id="user-password" name="password" value={password} placeholder="비밀번호"
               onChange={onPasswordChanged}
               onFocus={onPasswordFocused}
               onBlur={onPasswordBlured}
               onInvalid={onInvalid}
               required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$"
               minLength={8} maxLength={32}
        />
        {isPasswordFocused &&
          <>
            <FormMessage isActive={passwordValidationResult[ERROR_TYPE.PATTERN_MISMATCH]}>
              {errorMessages.password[ERROR_TYPE.PATTERN_MISMATCH]}
            </FormMessage>
            <FormMessage
              isActive={passwordValidationResult[ERROR_TYPE.TOO_SHORT] || passwordValidationResult[ERROR_TYPE.TOO_LONG]}>
              {errorMessages.password[ERROR_TYPE.TOO_SHORT]}
            </FormMessage>
          </>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <input type="password" id="user-password-check" name="passwordCheck" placeholder="비밀번호 확인"
               value={passwordCheck} onChange={onPasswordCheckChanged}
               onInvalid={onInvalid}
               required />
      </div>
      <button type="submit">
        계정 만들기
      </button>
    </form>
  );
};

export default SignUpForm;
import styles from './styles.module.css';
import {useCallback, useState} from "react";
import FormMessage from "../FormMessage";

function validateUsername(username) {
  const error = {
    characterCombination: false,
    length: false,
  };
  if (!username) {
    return error;
  }
  const pattern = /^[ㄱ-ㅎ가-힣\w-]+$/;
  if (!pattern.test(username)) {
    error.characterCombination = true;
  }
  if(username.length < 2 || username.length > 40) {
    error.length = true;
  }
  return error;
}

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [usernameError, setUsernameError] = useState({
    characterCombination: false,
    length: false,
  });

  const onUsernameChanged = useCallback((e) => {
    setUsername(e.target.value);
    const error = validateUsername(e.target.value);
    setUsernameError(error);
  }, []);

  const onUsernameFocused = useCallback(() => {
    setIsUsernameFocused(true);
  }, []);

  const onUsernameBlured = useCallback(()=> {
    setIsUsernameFocused(false);
  }, []);

  return (
    <form className={styles.SignUpForm}>
      <div className={styles.title}>
        <span className={styles.appName}>Easy Log</span>
        <h1>계정 만들기</h1>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-name">유저 이름</label>
        <input type="text" id="user-name" required value={username}
               onChange={onUsernameChanged}
               onFocus={onUsernameFocused}
               onBlur={onUsernameBlured} />
        {isUsernameFocused &&
          <>
            <FormMessage isActive={usernameError.characterCombination}>
              영문 대소문자/숫자/한글/언더바(_)/하이픈(-) 조합으로 입력해주세요
            </FormMessage>
            <FormMessage isActive={usernameError.length}>
              2자 이상 40자 이하 입력해주세요
            </FormMessage>
          </>
        }
      </div>
      <div className={styles.item}>
        <label htmlFor="user-email">이메일</label>
        <input type="email" id="user-email" required />
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password">비밀번호</label>
        <input type="password" id="user-password" required />
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <input type="password" id="user-password-check" required />
      </div>
      <button type="submit">
        계정 만들기
      </button>
    </form>
  );
};

export default SignUpForm;
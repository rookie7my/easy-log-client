import styles from './styles.module.css';

const SignUpForm = () => {
  return (
    <form className={styles.SignUpForm}>
      <div className={styles.title}>
        <span className={styles.appName}>Easy Log</span>
        <h1>계정 만들기</h1>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-name">유저 이름</label>
        <input type="text" id="user-name"/>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-email">이메일</label>
        <input type="email" id="user-email"/>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password">비밀번호</label>
        <input type="password" id="user-password"/>
      </div>
      <div className={styles.item}>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <input type="password" id="user-password-check"/>
      </div>
      <button type="submit">
        계정 만들기
      </button>
    </form>
  );
};

export default SignUpForm;
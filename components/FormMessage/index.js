import styles from './styles.module.css';

const FormMessage = ({children, isActive}) => {
  return (
    <div className={`${styles.FormMessage} ${isActive? styles.active : ''}`}>
      {children}
    </div>
  );
};

export default FormMessage;
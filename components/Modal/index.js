import styles from './styles.module.css';
import ModalPortal from "./ModalPortal";

const Modal = ({onModalClosed, title, content}) => {
  return (
    <ModalPortal>
      <div className={styles.dimmer} onClick={onModalClosed} />
      <div className={styles.outer}>
        <header className={styles.header}>
          <div className={styles.title}>
            {title}
          </div>
          <button className={styles.closeBtn} onClick={onModalClosed}>Close</button>
        </header>
        <section className={styles.content}>
          {content}
        </section>
      </div>
    </ModalPortal>
  );
};

export default Modal;

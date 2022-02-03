import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import ModalPortal from './ModalPortal';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({onModalClosed, title, content}) => {
  const closeBtn = useRef();
  useEffect(() => {
    closeBtn.current.focus();
  }, []);

  return (
    <ModalPortal>
      <div className={styles.dimmer} onClick={onModalClosed} />
      <div className={styles.outer}>
        <header className={styles.header}>
          <div className={styles.title}>
            {title}
          </div>
          <button ref={closeBtn} className={styles.closeBtn}
                  onClick={onModalClosed}>
            <AiOutlineClose />
          </button>
        </header>
        <section className={styles.content}>
          {content}
        </section>
      </div>
    </ModalPortal>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onModalClosed: PropTypes.func.isRequired,
};

export default Modal;

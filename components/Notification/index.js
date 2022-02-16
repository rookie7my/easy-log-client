import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { IoAlertCircle, IoCheckmarkCircle, IoCloseOutline, IoInformationCircle } from 'react-icons/io5';
import styles from './Notification.module.css';
import getNotificationContainer from './getNotificationContainer';

export const NOTIFICATION_TYPE = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

const DELETE_TIME_IN_MS = 300;
const AUTO_DELETE_TIME_IN_MS = 5 * 1000;

const Notification = ({type, children, onClose, autoClose}) => {
  const $notificationContainer = getNotificationContainer();

  const [isClosing, setIsClosing] = useState(false);

  const onCloseButtonClicked = useCallback(() => {
    if(!isClosing) {
      setIsClosing(prevState => !prevState);
    }
  }, [isClosing]);

  useEffect(() => {
    if(isClosing) {
      const timeoutId = setTimeout(onClose, DELETE_TIME_IN_MS);
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    if(autoClose) {
      const timeoutId = setTimeout(onCloseButtonClicked, AUTO_DELETE_TIME_IN_MS);
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [autoClose, onCloseButtonClicked]);

  return createPortal(
    <div className={classNames(
      styles.Notification,
      {
        [styles.slideIn]: !isClosing,
        [styles.slideOut]: isClosing
      }
    )}>
      <div className={classNames(
        styles.typeIcon,
        {
          [styles.info]: type === NOTIFICATION_TYPE.INFO,
          [styles.success]: type === NOTIFICATION_TYPE.SUCCESS,
          [styles.error]: type === NOTIFICATION_TYPE.ERROR,
        }
      )}>
        {type === NOTIFICATION_TYPE.INFO && <IoInformationCircle />}
        {type === NOTIFICATION_TYPE.SUCCESS && <IoCheckmarkCircle />}
        {type === NOTIFICATION_TYPE.ERROR && <IoAlertCircle />}
      </div>
      <div>
        {children}
      </div>
      <button className={styles.closeButton} onClick={onCloseButtonClicked}>
        <IoCloseOutline />
      </button>
    </div>,
    $notificationContainer
  );
};

export default Notification;

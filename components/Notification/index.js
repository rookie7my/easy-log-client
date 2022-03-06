import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { IoAlertCircle, IoCheckmarkCircle, IoCloseOutline, IoInformationCircle } from 'react-icons/io5';
import getNotificationContainer from './getNotificationContainer';

export const NOTIFICATION_TYPE = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

const CLOSING_PERIOD_IN_MS = 300;
const AUTO_CLOSING_PERIOD_IN_MS = 5 * 1000;

const $notificationContainer = typeof window !== 'undefined' ? getNotificationContainer() : null;

const Notification = ({ type, message, onClose, autoClose = false }) => {
  const [isClosing, setIsClosing] = useState(false);

  const onCloseButtonClicked = useCallback(() => {
    if(!isClosing) {
      setIsClosing(prevState => !prevState);
    }
  }, [isClosing]);

  useEffect(() => {
    if(isClosing) {
      const timeoutId = setTimeout(onClose, CLOSING_PERIOD_IN_MS);
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    if(autoClose) {
      const timeoutId = setTimeout(onCloseButtonClicked, AUTO_CLOSING_PERIOD_IN_MS);
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [autoClose, onCloseButtonClicked]);

  return createPortal(
    <div className={classNames('bg-white flex gap-2 items-center p-2 shadow-lg rounded transition-all duration-300 ease-in-out',
        {
          'animate-slide-in' : !isClosing,
          '-translate-y-full opacity-0': isClosing
        }
      )}>
      <div>
        {type === NOTIFICATION_TYPE.INFO && <IoInformationCircle className="text-blue-500" />}
        {type === NOTIFICATION_TYPE.SUCCESS && <IoCheckmarkCircle className="text-green-500" />}
        {type === NOTIFICATION_TYPE.ERROR && <IoAlertCircle className="text-red-500" />}
      </div>
      <p className="grow">{message}</p>
      <button className="rounded-full hover:bg-gray-300" onClick={onCloseButtonClicked}>
        <IoCloseOutline />
      </button>
    </div>,
    $notificationContainer
  );
};

export default Notification;

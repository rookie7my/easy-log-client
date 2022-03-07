import { useSelector } from 'react-redux';
import Notification from './Notification';

const Notifications = () => {
  const notifications = useSelector(state => state.notifications);

  return (
    <>
      {notifications.map(({id, message, isAutoClose, type}) => (
        <Notification key={id} id={id} message={message} isAutoClose={isAutoClose} type={type} />
      ))}
    </>
  );
};

export default Notifications;

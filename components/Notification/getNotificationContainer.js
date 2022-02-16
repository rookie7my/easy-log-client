import styles from './notificationContainer.module.css';

export default function getNotificationContainer() {
  let $notificationContainer = document.getElementById('notificationContainer');
  if($notificationContainer) return $notificationContainer;

  $notificationContainer = document.createElement('div');
  $notificationContainer.setAttribute('id', 'notificationContainer');
  $notificationContainer.classList.add(styles.notificationContainer);
  document.body.appendChild($notificationContainer);
  return $notificationContainer;
}

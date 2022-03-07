export default function getNotificationContainer() {
  const id = 'notificationContainer';
  let $notificationContainer = document.getElementById(id);
  if($notificationContainer) return $notificationContainer;

  $notificationContainer = document.createElement('div');
  $notificationContainer.setAttribute('id', id);
  $notificationContainer.classList.add(
    'flex', 'flex-col-reverse', 'gap-y-3', 'items-center', 'max-w-xs',
    'fixed', 'top-5', 'left-1/2', '-translate-x-1/2'
  );
  document.body.appendChild($notificationContainer);
  return $notificationContainer;
}

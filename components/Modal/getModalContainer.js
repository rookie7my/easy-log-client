export default function getModalContainer() {
  const id = 'modalContainer';
  let $modalContainer = document.getElementById(id);
  if($modalContainer) return $modalContainer;

  $modalContainer = document.createElement('div');
  $modalContainer.setAttribute('id', id);
  document.body.appendChild($modalContainer);
  return $modalContainer;
}

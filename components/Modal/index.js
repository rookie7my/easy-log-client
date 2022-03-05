import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import getModalContainer from './getModalContainer';

let $modalContainer = null;
if (typeof window !== 'undefined') {
  $modalContainer = getModalContainer();
}

const Modal = ({ onModalCloseButtonClicked, title, children }) => {
  const closeButtonRef = useRef();
  useEffect(() => {
    closeButtonRef.current.focus();
  }, []);

  return createPortal(
    <>
      <div
        onClick={onModalCloseButtonClicked}
        className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75"
      />
      <section className="flex flex-col gap-y-2 bg-white rounded
          fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4
          w-80 h-52 p-4"
      >
        <header>
          <h2 className="text-center font-bold">{title}</h2>
        </header>
        <div className="grow flex flex-col justify-center items-center">
          {children}
        </div>
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            onClick={onModalCloseButtonClicked}
            className="bg-blue-500 text-white rounded p-1.5 text-sm hover:bg-blue-700"
          >
            닫기
          </button>
        </div>
      </section>
    </>,
    $modalContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onModalCloseButtonClicked: PropTypes.func.isRequired,
};

export default Modal;

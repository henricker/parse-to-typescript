import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

type ModalPropsType = {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalPropsType> = ({ children, isOpen, setIsOpen }: ModalPropsType) => {
  const [modalStatus, setModaStatus] = useState(isOpen);

  useEffect(() => {
    if(isOpen !== modalStatus) {
      setModaStatus(isOpen);
    }
  }, [isOpen, modalStatus]);

  return (
    <ReactModal
    shouldCloseOnOverlayClick={!false}
    onRequestClose={setIsOpen}
    isOpen={modalStatus}
    ariaHideApp={false}
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#F0F0F5',
        color: '#000000',
        borderRadius: '8px',
        width: '736px',
        border: 'none',
      },
      overlay: {
        backgroundColor: '#121214e6',
      },
    }}
  >
    {children}
  </ReactModal>
  );
}

export default Modal;

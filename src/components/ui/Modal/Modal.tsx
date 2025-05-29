import { CSSProperties, ReactNode, useEffect } from 'react';
import { Modal as AntdModal } from 'antd';
import './Modal.less';
import { useTheme } from '../../../hooks/useTheme';
import { useTypingTestLock } from '../../../contexts/LockTypingTestContext';

interface Props {
  loading?: boolean;
  handleClose: () => void;
  open: boolean;
  title: string;
  children: ReactNode;
  triggerButton: ReactNode;
  destroyOnClose?: boolean;
}

function Modal({
  loading,
  title,
  open,
  handleClose,
  destroyOnClose,
  triggerButton,
  children,
}: Props) {
  const { currentTheme } = useTheme();
  const { lockTypingTestFromOutside, unlockTypingTestFromOutside } =
    useTypingTestLock();

  useEffect(() => {
    if (open) {
      lockTypingTestFromOutside();
    } else {
      unlockTypingTestFromOutside();
    }
  }, [open]);

  return (
    <>
      {triggerButton}

      <AntdModal
        title={<p>{title}</p>}
        destroyOnClose={destroyOnClose}
        loading={loading}
        className="custom-modal"
        style={
          {
            '--modal-bg-color': currentTheme.interface.secondaryColor,
            '--modal-secondary-bg-color': currentTheme.interface.tertiaryColor,
          } as CSSProperties
        }
        open={open}
        onCancel={handleClose}
      >
        {children}
      </AntdModal>
    </>
  );
}

export default Modal;

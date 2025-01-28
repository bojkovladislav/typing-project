import { ReactNode } from 'react';
import { Modal as AntdModal } from 'antd';

interface Props {
  loading?: boolean;

  handleClose: () => void;
  open: boolean;
  title: string;
  children: ReactNode;
  triggerButton: ReactNode;
}

function Modal({
  loading,
  title,
  open,
  handleClose,

  triggerButton,
  children,
}: Props) {
  return (
    <>
      {triggerButton}

      <AntdModal
        title={<p>{title}</p>}
        loading={loading}
        open={open}
        onCancel={handleClose}
      >
        {children}
      </AntdModal>
    </>
  );
}

export default Modal;

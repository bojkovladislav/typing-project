import { ReactNode } from 'react';
import { Button, Modal as AntdModal } from 'antd';

interface Props {
  loading?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  title: string;
  children: ReactNode;
}

function Modal({
  loading,
  title,
  open,
  handleClose,
  handleOpen,
  children,
}: Props) {
  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Open Modal
      </Button>
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

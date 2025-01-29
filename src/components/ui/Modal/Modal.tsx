import { ReactNode } from 'react';
import { Modal as AntdModal } from 'antd';
import './Modal.less';
import { useTheme } from '../../../hooks/useTheme';

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
  const theme = useTheme();

  return (
    <>
      {triggerButton}

      <AntdModal
        title={<p>{title}</p>}
        loading={loading}
        className="custom-modal"
        style={
          {
            '--modal-bg-color': theme.currentTheme.interface.secondaryColor,
            '--modal-secondary-bg-color':
              theme.currentTheme.interface.tertiaryColor,
          } as React.CSSProperties
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

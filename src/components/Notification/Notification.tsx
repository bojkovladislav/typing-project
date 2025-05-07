import { useEffect } from 'react';
import { CSSProperties } from 'react';
import {
  MessageOptions,
  NotificationXLocation,
  NotificationYLocation,
} from '../../types/notification';

interface NotificationProps extends MessageOptions {
  onClose: () => void;
}

function Notification({
  message,
  status,
  position,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle: CSSProperties = {
    backgroundColor: status,
    ...(position.centered
      ? {
          left: '50%',
          transform: 'translate(-50%, -50%)',
          [position.y || NotificationYLocation.TOP]: '60px',
        }
      : {
          [position.x || NotificationXLocation.RIGHT]: '20px',
          [position.y || NotificationYLocation.BOTTOM]: '20px',
        }),
  };

  return (
    <div className="absolute p-2 rounded shadow text-white" style={baseStyle}>
      {message}
    </div>
  );
}

export default Notification;

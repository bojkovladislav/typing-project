import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageOptions,
  NotificationXLocation,
  NotificationYLocation,
} from '../../types/notification';
import { notificationStyles, statusIcons } from './notificationStyles';

interface NotificationProps extends MessageOptions {
  onClose: () => void;
}

function Notification({
  message,
  status,
  position,
  onClose,
}: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle: CSSProperties = {
    ...notificationStyles[status],
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
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute p-2 rounded text-sm font-light font-mono cursor-pointer flex items-center gap-2"
          style={baseStyle}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {statusIcons[status]}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;

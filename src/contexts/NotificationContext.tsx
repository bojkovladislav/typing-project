import { createContext, ReactNode, useState } from 'react';
import { MessageOptions } from '../types/notification';

export interface NotificationContextType {
  options: MessageOptions | null;
  addNotification: (options: MessageOptions | null) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [options, setOptions] = useState<MessageOptions | null>(null);

  function addNotification(newOptions: MessageOptions | null) {
    setOptions(newOptions);
  }

  return (
    <NotificationContext.Provider value={{ options, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

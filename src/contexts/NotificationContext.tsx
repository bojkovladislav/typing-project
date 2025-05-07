import { createContext, ReactNode, useState } from 'react';
import { MessageOptions } from '../types/notification';

export interface NotificationContextType {
  options: MessageOptions | null;
  add: (options: MessageOptions | null) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [options, setOptions] = useState<MessageOptions | null>(null);

  function add(newOptions: MessageOptions | null) {
    setOptions(newOptions);
  }

  return (
    <NotificationContext.Provider value={{ options, add }}>
      {children}
    </NotificationContext.Provider>
  );
}

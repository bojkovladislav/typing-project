import { useContext } from 'react';
import {
  NotificationContext,
  NotificationContextType,
} from '../contexts/NotificationContext';

export function useNotification() {
  return useContext(NotificationContext) as NotificationContextType;
}

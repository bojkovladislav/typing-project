import { useContext } from 'react';
import {
  NotificationContext,
  NotificationContextType,
} from '../contexts/NotificationContext';
import { ApiResponse } from '../api/apiMiddleware';
import { MESSAGE_STATUS } from '../types/notification';

export function useNotification() {
  const notificationContext = useContext(
    NotificationContext
  ) as NotificationContextType;

  function handleAuthNotifications<R extends {}>(response: ApiResponse<R>) {
    if (!Object.keys(response.data).length) {
      notificationContext.addNotification({
        message: response.error,
        status: MESSAGE_STATUS.DANGER,
      });

      return;
    }

    notificationContext.addNotification({
      message: response.message,
      status: MESSAGE_STATUS.SUCCESS,
    });
  }

  return { ...notificationContext, handleAuthNotifications };
}

export enum MESSAGE_STATUS {
  FAIL = 'red',
  SUCCESS = 'green',
  PENDING = 'yellow',
}

export enum NotificationXLocation {
  LEFT = 'left',
  RIGHT = 'right',
}
export enum NotificationYLocation {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface NotificationPosition {
  x?: NotificationXLocation;
  y?: NotificationYLocation;
  centered?: boolean;
}

export interface MessageOptions {
  message: string;
  status: MESSAGE_STATUS;
  position: NotificationPosition;
}

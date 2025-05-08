import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

export const notificationStyles = {
  success: {
    color: '#0ad406',
    backgroundColor: 'rgba(7, 149, 66, 0.12)',
    border: '1px solid rgba(36, 241, 6, 0.46)',
    boxShadow: '0 0 2px #259c08',
    textShadow: '2px 1px #00040a',
  },
  info: {
    color: '#0396ff',
    backgroundColor: 'rgba(7, 73, 149, 0.12)',
    border: '1px solid rgba(6, 44, 241, 0.46)',
    boxShadow: '0 0 2px #0396ff',
    textShadow: '2px 1px #00040a',
  },
  warning: {
    color: '#ffb103',
    backgroundColor: 'rgba(220, 128, 1, 0.16)',
    border: '1px solid rgba(241, 142, 6, 0.81)',
    boxShadow: '0 0 2px #ffb103',
    textShadow: '2px 1px #00040a',
  },
  danger: {
    color: '#ff0303',
    backgroundColor: 'rgba(220, 17, 1, 0.16)',
    border: '1px solid rgba(241, 6, 6, 0.81)',
    boxShadow: '0 0 2px #ff0303',
    textShadow: '2px 1px #00040a',
  },
};

export const statusIcons: Record<string, JSX.Element> = {
  success: <CheckCircleOutlined />,
  info: <InfoCircleOutlined />,
  warning: <WarningOutlined />,
  danger: <ExclamationCircleOutlined />,
};

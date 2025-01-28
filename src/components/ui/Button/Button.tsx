import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  tabIndex: number;
  fill?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}

function Button({
  text,
  fill,
  action,
  customStyles,
  tabIndex,
  iconPosition = 'start',
  icon,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <button
      onClick={action}
      style={{
        backgroundColor: fill
          ? theme.currentTheme.interface.secondaryColor
          : 'transparent',
      }}
      className={customStyles}
      tabIndex={tabIndex}
    >
      <div
        className="flex gap-2"
        style={{
          flexDirection: iconPosition === 'start' ? 'row' : 'row-reverse',
        }}
      >
        {icon && icon}

        <p>{text}</p>
      </div>
    </button>
  );
}

export default Button;

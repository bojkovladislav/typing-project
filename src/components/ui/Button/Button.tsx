import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  tabIndex?: number;
  fill?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  preventDefault?: boolean;
}

function Button({
  text,
  fill,
  preventDefault,
  action,
  customStyles,
  tabIndex,
  iconPosition = 'start',
  icon,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <button
      onKeyDown={(e) => preventDefault && e.preventDefault()}
      onClick={action}
      style={{
        backgroundColor: fill
          ? theme.currentTheme.interface.selectedColor
          : 'transparent',
      }}
      className={customStyles}
      tabIndex={tabIndex}
    >
      {icon ? (
        <div
          className="flex gap-2"
          style={{
            flexDirection: iconPosition === 'start' ? 'row' : 'row-reverse',
          }}
        >
          {icon}

          <p>{text}</p>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
}

export default Button;

import { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import './Button.less';

interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  additionalStyles?: CSSProperties;
  tabIndex?: number;
  fill?: boolean;
  hoverEffect?: boolean;
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
  additionalStyles,
  hoverEffect,
  tabIndex,
  iconPosition = 'start',
  icon,
}: ButtonProps) {
  const { currentTheme } = useTheme();

  return (
    <button
      onKeyDown={(e) => preventDefault && e.preventDefault()}
      onClick={action}
      style={
        {
          backgroundColor: fill
            ? currentTheme.interface.selectedColor
            : 'transparent',
          '--button-hover-color': hoverEffect
            ? currentTheme.interface.selectedColor
            : 'white',
          ...additionalStyles,
        } as CSSProperties
      }
      className={`${customStyles} custom-button`}
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

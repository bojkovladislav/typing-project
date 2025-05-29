import { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import './Button.less';
import { IconPosition } from '../../../types/enums';

interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  additionalStyles?: CSSProperties;
  tabIndex?: number;
  fill?: boolean;
  hoverEffect?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
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
  iconPosition = IconPosition.START,
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
          transition: '0.3s all',
          outline: 'none',
          border: hoverEffect ? '' : 'none',
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
            flexDirection:
              iconPosition === IconPosition.START ? 'row' : 'row-reverse',
          }}
        >
          {icon}

          {text && <p>{text}</p>}
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
}

export default Button;

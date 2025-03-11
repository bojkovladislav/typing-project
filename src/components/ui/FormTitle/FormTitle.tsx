import { ReactNode } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { IconPosition } from '../../../types/enums';

interface Props {
  title: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
}

function FormTitle({ title, icon, iconPosition = IconPosition.START }: Props) {
  const { currentTheme } = useTheme();

  return (
    <div
      className="flex gap-3"
      style={{
        flexDirection:
          iconPosition === IconPosition.START ? 'row' : 'row-reverse',
      }}
    >
      {icon && <div className="cursor-pointer">{icon}</div>}

      <p style={{ color: currentTheme.text.neutral }}>{title}</p>
    </div>
  );
}

export default FormTitle;

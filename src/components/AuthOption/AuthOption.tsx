import { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router';
import { useHover } from '../../hooks/useHover';

interface Props {
  authOption: ReactNode;
  redirectTo: string;
}

function AuthOption({ authOption, redirectTo }: Props) {
  const { currentTheme } = useTheme();
  const { isHovered, hoverProps } = useHover();

  const backgroundColor = isHovered
    ? currentTheme.interface.tertiaryColor ||
      currentTheme.interface.primaryColor
    : currentTheme.interface.secondaryColor;

  return (
    <Link to={redirectTo} className="block w-full text-white default-clear">
      <div
        className="p-2 flex items-center justify-center w-full rounded-lg cursor-pointer transition-colors duration-300 ease-in-out"
        style={{ backgroundColor }}
        {...hoverProps}
      >
        {authOption}
      </div>
    </Link>
  );
}

export default AuthOption;

import { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  authOption: ReactNode;
  action: () => void;
}

function AuthOption({ authOption, action }: Props) {
  const { currentTheme } = useTheme();

  return (
    <div
      className="p-2 flex items-center justify-center w-full rounded-lg cursor-pointer"
      style={{ backgroundColor: currentTheme.interface.secondaryColor }}
      onClick={action}
    >
      {authOption}
    </div>
  );
}

export default AuthOption;

import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button/Button';

interface RestartButtonProps {
  action: () => void;
  tabIndex: number;
}

function RestartButton({ action, tabIndex }: RestartButtonProps) {
  const { currentTheme } = useTheme();

  return (
    <Button
      action={action}
      text="Restart test"
      customStyles="w-[150px] text-lg"
      tabIndex={tabIndex}
      fill
      additionalStyles={{ color: currentTheme.interface.primaryColor }}
    />
  );
}

export default RestartButton;

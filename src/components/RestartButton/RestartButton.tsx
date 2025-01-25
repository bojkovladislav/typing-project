import Button from '../ui/Button/Button';

interface RestartButtonProps {
  action: () => void;
  tabIndex: number;
}

function RestartButton({ action, tabIndex }: RestartButtonProps) {
  return (
    <Button
      action={action}
      text="Restart test"
      customStyles="w-[150px]"
      tabIndex={tabIndex}
    />
  );
}

export default RestartButton;

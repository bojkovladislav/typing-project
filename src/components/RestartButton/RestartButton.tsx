import Button from '../ui/Button/Button';

interface RestartButtonProps {
  action: () => void;
}

function RestartButton({ action }: RestartButtonProps) {
  return (
    <Button action={action} text="Restart test" customStyles="w-[150px]" />
  );
}

export default RestartButton;

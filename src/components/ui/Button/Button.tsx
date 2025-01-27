import { useTheme } from '../../../hooks/useTheme';

interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  tabIndex: number;
}

function Button({ text, action, customStyles, tabIndex }: ButtonProps) {
  const theme = useTheme();

  return (
    <button
      onClick={action}
      style={{ backgroundColor: theme.currentTheme.interface.secondaryColor }}
      className={customStyles}
      tabIndex={tabIndex}
    >
      {text}
    </button>
  );
}

export default Button;

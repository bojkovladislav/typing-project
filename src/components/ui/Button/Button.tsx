interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
  tabIndex: number;
}

function Button({ text, action, customStyles, tabIndex }: ButtonProps) {
  return (
    <button onClick={action} className={customStyles} tabIndex={tabIndex}>
      {text}
    </button>
  );
}

export default Button;

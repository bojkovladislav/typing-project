interface ButtonProps {
  text?: string;
  action: () => void;
  customStyles?: string;
}

function Button({ text, action, customStyles }: ButtonProps) {
  return (
    <button onClick={action} className={customStyles}>
      {text}
    </button>
  );
}

export default Button;

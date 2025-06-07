import { Input as AntdInput } from 'antd';
import type { InputRef } from 'antd';
import './Input.less';
import { useTheme } from '../../../hooks/useTheme';
import { RefObject } from 'react';

interface Props {
  inputRef?: RefObject<InputRef>;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
}

function Input({
  value,
  inputRef,
  onChange,
  autoFocus = false,
  placeholder,
}: Props) {
  const { currentTheme } = useTheme();

  const styleVars = {
    '--secondary-color': currentTheme.interface.secondaryColor,
    '--text-color': currentTheme.text.neutral,
    '--border-color': currentTheme.interface.selectedColor,
  } as React.CSSProperties;

  return (
    <AntdInput
      ref={inputRef}
      variant="filled"
      className="custom-number-input"
      style={styleVars}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
      placeholder={placeholder}
      size="large"
    />
  );
}

export default Input;

import { InputNumber } from 'antd';
import './NumberInput.less';
import { useTheme } from '../../../hooks/useTheme';
import { RefObject } from 'react';

interface Props {
  inputRef?: RefObject<HTMLInputElement>;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  autoFocus?: boolean;
  placeholder?: string;
}

function NumberInput({
  value,
  inputRef,
  onChange,
  max = 999,
  min = 0,
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
    <InputNumber
      ref={inputRef}
      variant="filled"
      className="custom-number-input"
      style={styleVars}
      value={value}
      onChange={(val) => onChange(Number(val))}
      max={max}
      min={min}
      autoFocus={autoFocus}
      placeholder={placeholder}
      size="large"
      controls={false}
    />
  );
}

export default NumberInput;

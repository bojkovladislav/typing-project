import { useEffect, useRef } from 'react';
import type { InputRef } from 'antd';

export function useInputFocus() {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return { inputRef };
}

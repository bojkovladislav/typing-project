import { useEffect, useRef } from 'react';

export function useInputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return { inputRef };
}

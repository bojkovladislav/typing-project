import { useState } from 'react';

export function useBlurControl() {
  const [isBlurred, setIsBlurred] = useState(false);

  return { isBlurred, blur: (value: boolean) => setIsBlurred(value) };
}

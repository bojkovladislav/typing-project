import { useEffect, useState } from 'react';

export function useTypingTimer(active: boolean) {
  const [currentSecond, setCurrentSecond] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSecond((prevSecond) => prevSecond + 1);
    }, 1000);

    if (!active !== null) {
      clearInterval(timer);

      return;
    }

    return () => clearInterval(timer);
  }, [active]);

  return { currentSecond, setCurrentSecond };
}

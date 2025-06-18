import { useEffect, useState } from 'react';

export function useTypingTimer(active: boolean) {
  const [currentSecond, setCurrentSecond] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (active) {
      timer = setInterval(() => {
        setCurrentSecond((prevSecond) => prevSecond + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [active]);

  return { currentSecond, setCurrentSecond };
}

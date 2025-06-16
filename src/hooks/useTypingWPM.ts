import { MutableRefObject, useEffect, useState } from 'react';

export function useTypingWPM(
  totalChars: number,
  currentSecond: number,
  currentLetterIndexRef: MutableRefObject<number>
) {
  const [wpmResult, setWpmResult] = useState<number | null>(null);

  useEffect(() => {
    if (
      totalChars &&
      currentLetterIndexRef.current >= totalChars &&
      wpmResult === null
    ) {
      const minutesElapsed = currentSecond / 60;
      const WPM = Math.floor(totalChars / 5 / minutesElapsed);

      currentLetterIndexRef.current = 0;

      setWpmResult(WPM);

      return;
    }
  }, [currentLetterIndexRef.current]);

  return { wpmResult, setWpmResult };
}

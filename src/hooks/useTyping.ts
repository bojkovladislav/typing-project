import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SetState } from '../types/common';
import { TextCharacter } from '../types/typing';
import { KeysToIgnore } from '../constants';

type ReturnValues = [
  currentLetterIndex: MutableRefObject<number>,
  wpmResult: number | null,
  restart: () => void
];

export default function useTyping(
  text: TextCharacter[],
  setText: SetState<TextCharacter[]>
): ReturnValues {
  const currentLetterIndexRef = useRef(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [wpmResult, setWpmResult] = useState<number | null>(null);

  function restart() {
    currentLetterIndexRef.current = 0;
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    setWpmResult(null);
    setCurrentSecond(1);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSecond((prevSecond) => prevSecond + 1);
    }, 1000);

    if (wpmResult !== null) {
      clearInterval(timer);

      return;
    }

    return () => clearInterval(timer);
  }, [wpmResult]);

  console.log(currentLetterIndexRef.current, text.length);

  useEffect(() => {
    if (
      text.length &&
      currentLetterIndexRef.current >= text.length &&
      wpmResult === null
    ) {
      const minutesElapsed = currentSecond / 60;
      const WPM = Math.floor(text.length / 5 / minutesElapsed);

      console.log('test');

      // console.log(`your WPM IS ${WPM}`);

      currentLetterIndexRef.current = 0;

      setWpmResult(WPM);

      return;
    }
  }, [currentLetterIndexRef.current]);

  // console.log(currentLetterIndexRef.current, text.length - 1);

  // console.log('current second', currentSecond);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log('before: ', wpmResult);

      // if (wpmResult !== null) return;

      // console.log('after:  ', wpmResult);

      const key = event.key;

      if (KeysToIgnore.includes(key)) return;

      if (event.ctrlKey && key === 'Backspace') {
        const startIndex = currentLetterIndexRef.current;
        let currentIndex = startIndex - 1;
        const stopCharacters = [' ', ',', '.'];

        if (startIndex === 0) return;

        setText((prevText) => {
          if (stopCharacters.includes(prevText[currentIndex].value)) {
            currentIndex--;
          }

          while (
            currentIndex >= 0 &&
            !stopCharacters.includes(prevText[currentIndex].value)
          ) {
            currentIndex--;
          }

          currentIndex = Math.max(currentIndex + 1, 0);

          currentLetterIndexRef.current = currentIndex;

          const updatedText = prevText.map((letter, letIndex) => ({
            ...letter,
            currentColor:
              letIndex <= startIndex && letIndex >= currentIndex
                ? letter.colors.neutral
                : letter.currentColor,
          }));

          return updatedText;
        });

        return;
      }

      if (key === 'Backspace') {
        currentLetterIndexRef.current = Math.max(
          currentLetterIndexRef.current - 1,
          0
        );
      } else {
        currentLetterIndexRef.current += 1;
      }

      setText((prevText) =>
        prevText.map((letter, letIndex) => {
          const { correct, incorrect, neutral } = letter.colors;
          let updatedColor: string;

          if (key === 'Backspace') {
            updatedColor = neutral;
          } else {
            updatedColor = key === letter.value ? correct : incorrect;
          }

          if (
            letIndex ===
            (key === 'Backspace'
              ? currentLetterIndexRef.current
              : currentLetterIndexRef.current - 1)
          ) {
            return {
              ...letter,
              currentColor: updatedColor,
            };
          }

          return letter;
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setText]);

  return [currentLetterIndexRef, wpmResult, restart];
}

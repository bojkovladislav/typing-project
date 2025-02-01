import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SetState } from '../types/common';
import { TextCharacter } from '../types/typing';
import { KeysToIgnore } from '../constants';

interface ReturnValues {
  currentLetterIndex: MutableRefObject<number>;
  wpmResult: number | null;
  numberOfTypedWords: number;
  restart: () => void;
}

export default function useTyping(
  text: TextCharacter[],
  setText: SetState<TextCharacter[]>
): ReturnValues {
  const currentLetterIndexRef = useRef(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [wpmResult, setWpmResult] = useState<number | null>(null);
  const [endIndexesOfTypedWords, setEndIndexesOfTypedWords] = useState<
    number[]
  >([]);

  function restart() {
    currentLetterIndexRef.current = 0;
    const activeElement = document.activeElement;

    setEndIndexesOfTypedWords([]);

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

  useEffect(() => {
    if (
      text.length &&
      currentLetterIndexRef.current >= text.length &&
      wpmResult === null
    ) {
      const minutesElapsed = currentSecond / 60;
      const WPM = Math.floor(text.length / 5 / minutesElapsed);

      currentLetterIndexRef.current = 0;

      setWpmResult(WPM);

      return;
    }
  }, [currentLetterIndexRef.current]);

  function findStartIndex() {
    const currentIndex = currentLetterIndexRef.current;
    const stopCharacters = [' ', ',', '.'];
    let startIndex = currentIndex - 1;

    if (currentIndex === 0) return 0;

    if (stopCharacters.includes(text[startIndex].value)) {
      startIndex--;
    }

    while (
      startIndex >= 0 &&
      !stopCharacters.includes(text[startIndex].value)
    ) {
      startIndex--;
    }

    return Math.max(startIndex + 1, 0);
  }

  function isTheWordCorrect(startIndex: number, endIndex: number) {
    const currentWord = text.slice(startIndex, endIndex);

    return currentWord.every(
      (letter) => letter.currentColor === letter.colors.correct
    );
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      let updatedIndex = currentLetterIndexRef.current;

      if (text[updatedIndex].value === ' ' && key !== 'Backspace') {
        setEndIndexesOfTypedWords((prevIndexes) =>
          !prevIndexes.includes(updatedIndex)
            ? [...prevIndexes, updatedIndex]
            : prevIndexes
        );
      }

      if (KeysToIgnore.includes(key)) return;

      if (event.ctrlKey && key === 'Backspace') {
        const startIndex = findStartIndex();

        if (
          text[updatedIndex].value === ' ' ||
          text[updatedIndex - 1].value === ' '
        ) {
          const theWordIsCorrect = isTheWordCorrect(startIndex, updatedIndex);

          if (theWordIsCorrect) return;
        }

        setText((prevText) => {
          currentLetterIndexRef.current = startIndex;

          const updatedText = prevText.map((letter, letIndex) => ({
            ...letter,
            currentColor:
              letIndex <= updatedIndex && letIndex >= startIndex
                ? letter.colors.neutral
                : letter.currentColor,
          }));

          return updatedText;
        });

        return;
      }

      if (key === 'Backspace') {
        updatedIndex = Math.max(updatedIndex - 1, 0);

        if (text[updatedIndex].value === ' ') {
          const startIndex = findStartIndex();

          const theWordIsCorrect = isTheWordCorrect(startIndex, updatedIndex);

          if (theWordIsCorrect) return;
        }
      } else {
        updatedIndex++;
      }

      currentLetterIndexRef.current = updatedIndex;

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
            letIndex === (key === 'Backspace' ? updatedIndex : updatedIndex - 1)
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
  }, [text, setText]);

  return {
    currentLetterIndex: currentLetterIndexRef,
    wpmResult,
    numberOfTypedWords: endIndexesOfTypedWords.length,
    restart,
  };
}

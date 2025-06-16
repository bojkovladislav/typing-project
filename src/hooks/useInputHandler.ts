import { MutableRefObject, useEffect } from 'react';
import { TextCharacter } from '../types/typing';
import { KeysToIgnore } from '../constants';
import { SetState } from '../types/common';

interface Props {
  text: TextCharacter[];
  setText: SetState<TextCharacter[]>;
  currentLetterIndexRef: MutableRefObject<number>;
  blur: (value: boolean) => void;
  isTypingTestLocked: MutableRefObject<boolean>;
  setEndIndexesOfTypedWords: SetState<number[]>;
  isTypingTestLockedFromOutside: MutableRefObject<boolean>;
  unlockTypingTest: () => void;
}

export function useInputHandler({
  currentLetterIndexRef,
  isTypingTestLockedFromOutside,
  unlockTypingTest,
  text,
  setText,
  blur,
  isTypingTestLocked,
  setEndIndexesOfTypedWords,
}: Props) {
  function isTheWordCorrect(startIndex: number, endIndex: number) {
    const currentWord = text.slice(startIndex, endIndex);

    return currentWord.every(
      (letter) => letter.currentColor === letter.colors.correct
    );
  }

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      let updatedIndex = currentLetterIndexRef.current;

      if (isTypingTestLockedFromOutside.current) {
        return;
      }

      if (isTypingTestLocked.current) {
        unlockTypingTest();
        blur(false);

        return;
      }

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

        setText((prevText: TextCharacter[]): TextCharacter[] => {
          currentLetterIndexRef.current = startIndex;

          return prevText.map(
            (letter, letIndex): TextCharacter => ({
              ...letter,
              currentColor:
                letIndex <= updatedIndex && letIndex >= startIndex
                  ? letter.colors.neutral
                  : letter.currentColor,
            })
          );
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
}

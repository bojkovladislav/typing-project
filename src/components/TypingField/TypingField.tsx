import { useEffect, useMemo, useState } from 'react';
import { Mode, Modes, WordsMode } from '../../types/configurationBar';
import { TextCharacter } from '../../types/typing';
import Cursor from '../ui/Cursor/Cursor';
import { SetState } from '../../types/common';

interface Props {
  text: TextCharacter[];
  currentLetterIndex: number;
  currentMode: Mode;
  timer: number;
  numberOfTypedWords: number;
  setTimer: SetState<number>;
}

function TypingField({
  text,
  currentLetterIndex,
  currentMode,
  numberOfTypedWords,
  timer,
  setTimer,
}: Props) {
  const PEAK_NUMBER_OF_CHARACTERS = 50;

  const initialVisibleCount = useMemo(() => {
    return Math.min(text.length, PEAK_NUMBER_OF_CHARACTERS);
  }, [text]);

  const [visibleCount, setVisibleCount] = useState(PEAK_NUMBER_OF_CHARACTERS);

  console.log('visible', visibleCount);

  const wordsCounter = useMemo(() => {
    return `${numberOfTypedWords} / ${
      (currentMode.additionalOptions as WordsMode).selectedNumberOfWords
    }`;
  }, [currentMode.additionalOptions, numberOfTypedWords]);

  console.log(currentLetterIndex);

  useEffect(() => {
    if (currentMode.selectedMode !== Modes.TIME || timer === 0) return;

    const timeout = setTimeout(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, setTimer, currentMode.selectedMode, currentLetterIndex]);

  useEffect(() => {
    if (
      visibleCount >= PEAK_NUMBER_OF_CHARACTERS &&
      currentLetterIndex >= visibleCount
    ) {
      setVisibleCount((prevCount) => {
        const remainingCharacters = text.length - prevCount;

        console.log('remaining', remainingCharacters);

        if (remainingCharacters > PEAK_NUMBER_OF_CHARACTERS)
          return prevCount + PEAK_NUMBER_OF_CHARACTERS;

        console.log('remaining', remainingCharacters);

        return prevCount + remainingCharacters;
      });
    }
  }, [currentLetterIndex]);

  return (
    <div className="relative">
      <div className="absolute left-0 top-[-30px] text-xl">
        {currentMode.selectedMode === Modes.TIME ? timer : wordsCounter}
      </div>

      <div
      //  className="max-w-[1500px] overflow-y-hidden transition-all duration-300 ease-in-out h-[100px]"
      >
        {text.slice(0, visibleCount).map((letter, i) => (
          <span
            key={i}
            className="relative text-3xl"
            style={{ color: letter.currentColor }}
          >
            {i === currentLetterIndex && <Cursor />}
            {letter.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TypingField;

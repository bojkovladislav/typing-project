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
  loading: boolean;
}

function TypingField({
  text,
  currentLetterIndex,
  currentMode,
  loading,
  numberOfTypedWords,
  timer,
  setTimer,
}: Props) {
  const words = text
    .map((letter) => letter.value)
    .join('')
    .split(' ');

  console.log(words.slice(0, 2).join(' ').trim());

  // const test = words.slice(0, 2).join(' ').trim().length;

  const PEAK_NUMBER_OF_CHARACTERS = words.slice(0, 2).join(' ').length;

  // console.log(
  //   words.slice(0, 2).join(' ').trim().length,
  //   PEAK_NUMBER_OF_CHARACTERS
  // );

  // console.log(
  //   text
  //     .slice(0, 17)
  //     .map((letter) => letter.value)
  //     .join('')
  // );

  // FIGURE OUT WHY DATA IS GETTING FETCHED 2 TIMES === THIS WILL SOLVE THE PROBLEM HERE TOO.

  const [visibleCount, setVisibleCount] = useState(0);

  console.log(PEAK_NUMBER_OF_CHARACTERS, visibleCount);

  useEffect(() => {
    if (!loading && text.length > 0 && visibleCount === 0) {
      setVisibleCount(Math.min(text.length, PEAK_NUMBER_OF_CHARACTERS));
    }
  }, [text, loading]);

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
    if (currentLetterIndex > visibleCount / 2) {
      setVisibleCount((prevCount) => {
        const remainingCharacters = text.length - prevCount;

        if (remainingCharacters > PEAK_NUMBER_OF_CHARACTERS)
          return prevCount + PEAK_NUMBER_OF_CHARACTERS;

        return prevCount + remainingCharacters;
      });
    }
  }, [currentLetterIndex]);

  return (
    <div className="relative">
      {!loading && (
        <div className="absolute left-0 top-[-30px] text-xl">
          {currentMode.selectedMode === Modes.TIME ? timer : wordsCounter}
        </div>
      )}

      <div className="max-w-[1500px] transition-all duration-300 ease-in-out max-h-[200px]">
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

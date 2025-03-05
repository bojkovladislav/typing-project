import { useEffect, useMemo, useState } from 'react';
import { Mode, Modes, WordsMode } from '../../types/configurationBar';
import { TextCharacter } from '../../types/typing';
import Cursor from '../ui/Cursor/Cursor';
import { SetState } from '../../types/common';
import { defaultMode } from '../../constants';

interface Props {
  currentLetterIndex: number;
  currentMode: Mode;
  timer: number;
  numberOfTypedWords: number;
  numberOfWords: number;
  setTimer: SetState<number>;
  loading: boolean;
  text: TextCharacter[];
}

function TypingField({
  text,
  currentLetterIndex,
  currentMode,
  loading,
  numberOfTypedWords,
  numberOfWords,
  timer,
  setTimer,
}: Props) {
  function getWordsFromLetters(text: TextCharacter[] | undefined) {
    if (!text) return [];

    return text
      .map((letter) => letter.value)
      .join('')
      .split(' ');
  }

  const words = getWordsFromLetters(text);

  function determineWordsLength() {
    const defaultLengths = (defaultMode.additionalOptions as WordsMode)
      .lengthToSelect;

    if (words.length > defaultLengths[1]) {
      return words.length >= defaultLengths[2] ? 35 : defaultLengths[1];
    }
  }

  const PEAK_NUMBER_OF_CHARACTERS = useMemo(() => {
    return words.slice(0, determineWordsLength()).join(' ').length;
  }, [text.length]);

  const [visibleCount, setVisibleCount] = useState(PEAK_NUMBER_OF_CHARACTERS);

  useEffect(() => {
    setVisibleCount(PEAK_NUMBER_OF_CHARACTERS);
  }, [PEAK_NUMBER_OF_CHARACTERS]);

  const wordsCounter = useMemo(() => {
    return `${numberOfTypedWords} / ${numberOfWords}`;
  }, [currentMode.additionalOptions, numberOfTypedWords, numberOfWords]);

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
    setVisibleCount((prevCount) => {
      if (prevCount - currentLetterIndex === 10) {
        return prevCount + PEAK_NUMBER_OF_CHARACTERS;
      }

      return prevCount;
    });
  }, [currentLetterIndex]);

  return (
    <div className="relative">
      {!loading && (
        <div className="absolute left-0 top-[-30px] text-xl">
          {currentMode.selectedMode === Modes.TIME ? timer : wordsCounter}
        </div>
      )}

      <div className="max-w-[1500px] transition-all duration-300 ease-in-out">
        {text.slice(0, visibleCount).map((letter, i) => (
          <span
            key={i}
            className="relative text-3xl mb-3"
            style={{
              color: letter.currentColor,
              display: `inline${!letter.value.trim().length ? '' : '-block'}`,
            }}
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

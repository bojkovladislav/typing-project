import { useEffect, useMemo } from 'react';
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

  return (
    <div className="relative">
      <div className="absolute left-0 top-[-30px] text-xl">
        {currentMode.selectedMode === Modes.TIME ? timer : wordsCounter}
      </div>

      {text.map((letter, i) => (
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
  );
}

export default TypingField;

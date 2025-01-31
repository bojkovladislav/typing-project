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
  setTimer: SetState<number>;
}

function TypingField({
  text,
  currentLetterIndex,
  currentMode,
  timer,
  setTimer,
}: Props) {
  const [numberOfCorrectTypedWords, setNumberOfCorrectTypedWords] = useState(0);

  const wordsCounter = useMemo(() => {
    return `${numberOfCorrectTypedWords}/${
      (currentMode.additionalOptions as WordsMode).selectedNumberOfWords
    }`;
  }, [currentMode.additionalOptions, numberOfCorrectTypedWords]);

  useEffect(() => {
    if (timer === 0) return;

    const timeout = setTimeout(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, setTimer, currentMode.selectedMode]);

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

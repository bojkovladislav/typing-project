import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Mode, Modes, WordsMode } from '../../types/configurationBar';
import { TextCharacter } from '../../types/typing';
import Cursor from '../ui/Cursor/Cursor';
import { SetState } from '../../types/common';
import { defaultMode } from '../../constants';
import { LockOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface Props {
  currentLetterIndex: number;
  currentMode: Mode;
  timer: number;
  numberOfTypedWords: number;
  numberOfWords: number;
  setTimer: SetState<number>;
  loading: boolean;
  text: TextCharacter[];
  isFocused: MutableRefObject<boolean>;
  isBlurred: boolean;
  blur: (value: boolean) => void;
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
  isFocused,
  isBlurred,
  blur,
}: Props) {
  const textFieldRef = useRef<HTMLDivElement>(null);

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
    let timeout: NodeJS.Timeout;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const interactiveAncestor = target.closest(
        'button, input, textarea, select, label, [role="button"], [role="menu"], [data-ignore-blur]'
      );

      if (interactiveAncestor) return;

      if (
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target as Node)
      ) {
        isFocused.current = false;

        timeout = setTimeout(() => {
          if (!isFocused.current) {
            blur(true);
          }
        }, 2000);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeout);
    };
  }, []);

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
    <div
      className="relative"
      ref={textFieldRef}
      onClick={() => (isFocused.current = true)}
    >
      {isBlurred && (
        <div
          className="flex items-center justify-center gap-3 cursor-default center-absolute w-full h-full z-10"
          onClick={() => {
            blur(false);
          }}
        >
          <LockOutlined className="text-xl" />
          <p className="text-xl">Click here or press any key to unlock</p>
        </div>
      )}

      {!loading && !isBlurred && (
        <div className="absolute left-0 top-[-30px] text-xl">
          {currentMode.selectedMode === Modes.TIME ? timer : wordsCounter}
        </div>
      )}

      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="max-w-[1500px] transition-all duration-300 ease-in-out">
          {text.slice(0, visibleCount).map((letter, i) => (
            <span
              key={i}
              className="relative text-3xl mb-3"
              style={{
                color: letter.currentColor,
                filter: isBlurred ? 'blur(5px)' : 'none',
                display: `inline${!letter.value.trim().length ? '' : '-block'}`,
              }}
            >
              {i === currentLetterIndex && isFocused.current && <Cursor />}
              {letter.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypingField;

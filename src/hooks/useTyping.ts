import { MutableRefObject, useRef, useState } from 'react';
import { TextCharacter } from '../types/typing';
import { useTypingContext } from '../contexts/TypingContext';
import { SetState } from '../types/common';
import { useTypingTestLock } from '../contexts/LockTypingTestContext';
import { useTypingTimer } from './useTypingTimer';
import { useTypingWPM } from './useTypingWPM';
import { useBlurControl } from './useBlurControl';
import { useInputHandler } from './useInputHandler';

interface ReturnValues {
  currentLetterIndex: MutableRefObject<number>;
  wpmResult: number | null;
  numberOfTypedWords: number;
  restart: () => void;
  isBlurred: boolean;
  blur: (value: boolean) => void;
}

export default function useTyping(): ReturnValues {
  const currentLetterIndexRef = useRef(0);
  const [endIndexesOfTypedWords, setEndIndexesOfTypedWords] = useState<
    number[]
  >([]);
  const { text, setText } = useTypingContext() as {
    text: TextCharacter[];
    setText: SetState<TextCharacter[]>;
  };
  const {
    isTypingTestLocked,
    unlockTypingTest,
    isTypingTestLockedFromOutside,
  } = useTypingTestLock();
  const { isBlurred, blur } = useBlurControl();
  const { currentSecond, setCurrentSecond } = useTypingTimer(
    currentLetterIndexRef.current > 0 &&
      currentLetterIndexRef.current <= text.length
  );
  const { wpmResult, setWpmResult } = useTypingWPM(
    text.length,
    currentSecond,
    currentLetterIndexRef
  );

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

  useInputHandler({
    text,
    setText,
    currentLetterIndexRef,
    isTypingTestLocked,
    isTypingTestLockedFromOutside,
    unlockTypingTest,
    blur,
    setEndIndexesOfTypedWords,
  });

  return {
    currentLetterIndex: currentLetterIndexRef,
    wpmResult,
    numberOfTypedWords: endIndexesOfTypedWords.length,
    restart,
    isBlurred,
    blur,
  };
}

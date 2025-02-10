import { useEffect, useState } from 'react';
import TypingField from '../../components/TypingField/TypingField';
import useTyping from '../../hooks/useTyping';
import RestartButton from '../../components/RestartButton/RestartButton';
import { TextCharacter } from '../../types/typing';
import { Mode, Modes, TimeMode, WordsMode } from '../../types/configurationBar';
import { SetState } from '../../types/common';
import { fetchWords } from '../../api';
import { useFetch } from '../../hooks/useFetch';

interface Props {
  currentMode: Mode;
  setCurrentMode: SetState<Mode>;
}

function TypingTest({ currentMode, setCurrentMode }: Props) {
  const [textToDisplay, setTextToDisplay] = useState<TextCharacter[]>([]);
  const [timer, setTimer] = useState<number>(
    (currentMode.additionalOptions as TimeMode).selectedTimeLimit || 60
  );

  const {
    loading: wordsLoading,
    data: wordsData,
    error: wordsError,
    refetch: getWords,
  } = useFetch(
    () =>
      fetchWords(
        false,
        false,
        (currentMode.additionalOptions as WordsMode).selectedNumberOfWords
      ),
    true
  );

  useEffect(() => {
    if (wordsData?.data) {
      setTextToDisplay(wordsData.data);
    }
  }, [wordsData?.data]);

  const { currentLetterIndex, wpmResult, numberOfTypedWords, restart } =
    useTyping(textToDisplay, setTextToDisplay);

  function restartTest() {
    restart();
    setTextToDisplay([]);
    getWords();
  }

  useEffect(() => {
    if (currentMode.selectedMode === Modes.TIME) {
      setTimer((currentMode.additionalOptions as TimeMode).selectedTimeLimit);
    }

    currentLetterIndex.current = 0;

    if (currentMode.selectedMode === Modes.WORDS) {
      getWords();
    }
  }, [currentMode]);

  return (
    <div className="flex flex-col gap-10 items-center">
      {wpmResult !== null || timer === 0 ? (
        <p className="text-3xl">{`Your result is ${
          wpmResult || 0
        } words per minute!`}</p>
      ) : (
        <TypingField
          text={textToDisplay}
          currentMode={currentMode}
          currentLetterIndex={currentLetterIndex.current}
          numberOfTypedWords={numberOfTypedWords}
          timer={timer}
          setTimer={setTimer}
          loading={wordsLoading}
        />
      )}

      <RestartButton action={restartTest} tabIndex={0} />
    </div>
  );
}

export default TypingTest;

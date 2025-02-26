import { useEffect, useState } from 'react';
import TypingField from '../../components/TypingField/TypingField';
import useTyping from '../../hooks/useTyping';
import RestartButton from '../../components/RestartButton/RestartButton';
import { TextCharacter } from '../../types/typing';
import { Mode, Modes, TimeMode, WordsMode } from '../../types/configurationBar';
import { SetState } from '../../types/common';
import { fetchQuote, fetchWords } from '../../api';
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
  const wordsMode = currentMode.additionalOptions as WordsMode;

  const {
    loading: wordsLoading,
    data: wordsData,
    error: wordsError,
    refetch: getWords,
  } = useFetch(
    () =>
      fetchWords(
        wordsMode.punctuation,
        wordsMode.numbers,
        wordsMode.selectedNumberOfWords
      ),
    true
  );

  const {
    loading: quoteLoading,
    data: quoteData,
    error: quoteError,
    refetch: getQuote,
  } = useFetch(fetchQuote, true);

  useEffect(() => {
    if (wordsData?.data) {
      setTextToDisplay(wordsData.data);
    }
  }, [wordsData?.data]);

  useEffect(() => {
    if (quoteData?.data) {
      setTextToDisplay(quoteData.data);
    }
  }, [quoteData?.data]);

  function fetchText() {
    if (currentMode.selectedMode === Modes.WORDS) {
      console.log('words');
      getWords();
    }

    if (currentMode.selectedMode === Modes.QUOTE) {
      console.log('quote');

      getQuote();
    }
  }

  const { currentLetterIndex, wpmResult, numberOfTypedWords, restart } =
    useTyping(textToDisplay, setTextToDisplay);

  function restartTest() {
    restart();
    setTextToDisplay([]);
    fetchText();
  }

  useEffect(() => {
    if (currentMode.selectedMode === Modes.TIME) {
      setTimer((currentMode.additionalOptions as TimeMode).selectedTimeLimit);
    }

    currentLetterIndex.current = 0;

    fetchText();
  }, [currentMode]);

  return (
    <div className="flex flex-col gap-10 items-center">
      {wpmResult !== null || timer === 0 ? (
        <p className="text-3xl">{`Your result is ${
          wpmResult || 0
        } words per minute!`}</p>
      ) : (
        !wordsError &&
        (quoteData?.data || wordsData?.data) && (
          <TypingField
            currentMode={currentMode}
            currentLetterIndex={currentLetterIndex.current}
            numberOfTypedWords={numberOfTypedWords}
            timer={timer}
            setTimer={setTimer}
            loading={wordsLoading}
            quote={quoteData?.data}
            text={textToDisplay}
          />
        )
      )}

      {wordsError && <p>{wordsError}</p>}

      <RestartButton action={restartTest} tabIndex={0} />
    </div>
  );
}

export default TypingTest;

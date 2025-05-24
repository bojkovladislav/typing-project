import { useEffect, useState } from 'react';
import TypingField from '../../components/TypingField/TypingField';
import useTyping from '../../hooks/useTyping';
import RestartButton from '../../components/RestartButton/RestartButton';
import { Mode, Modes, TimeMode, WordsMode } from '../../types/configurationBar';
import { fetchQuote, fetchWords } from '../../api';
import { useFetch } from '../../hooks/useFetch';
import { useTypingContext } from '../../contexts/TypingContext';

interface Props {
  currentMode: Mode;
}

function TypingTest({ currentMode }: Props) {
  const { text, setText } = useTypingContext();
  const [timer, setTimer] = useState<number>(
    (currentMode.additionalOptions as TimeMode).selectedTimeLimit || 60
  );
  const wordsMode = currentMode.additionalOptions as WordsMode;
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);

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
      setCurrentNumberOfWords(wordsData.data.numberOfWords);
      setText(wordsData.data.text);
    }

    setIsDataLoading(wordsLoading);
  }, [wordsData?.data]);

  useEffect(() => {
    if (quoteData?.data) {
      setCurrentNumberOfWords(quoteData.data.numberOfWords);
      setText(quoteData.data.text);
    }

    setIsDataLoading(quoteLoading);
  }, [quoteData?.data]);

  function fetchText() {
    if (currentMode.selectedMode === Modes.WORDS) {
      getWords();
    }

    if (currentMode.selectedMode === Modes.QUOTE) {
      getQuote();
    }
  }

  const {
    currentLetterIndex,
    wpmResult,
    numberOfTypedWords,
    restart,
    isFocused,
    isBlurred,
    blur,
  } = useTyping();

  function restartTest() {
    restart();
    setText([]);
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
            loading={isDataLoading}
            text={text}
            numberOfWords={currentNumberOfWords}
            isFocused={isFocused}
            isBlurred={isBlurred}
            blur={blur}
          />
        )
      )}

      {wordsError && <p>{wordsError}</p>}

      <RestartButton action={restartTest} tabIndex={0} />
    </div>
  );
}

export default TypingTest;

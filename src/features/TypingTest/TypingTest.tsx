import { useEffect, useState } from 'react';
import TypingField from '../../components/TypingField/TypingField';
import useTyping from '../../hooks/useTyping';
import RestartButton from '../../components/RestartButton/RestartButton';
import { TextCharacter } from '../../types/typing';
import { useTheme } from '../../hooks/useTheme';
import { Mode, Modes, TimeMode, WordsMode } from '../../types/configurationBar';
import { SetState } from '../../types/common';
import { fetchWords } from '../../api';

interface Props {
  currentMode: Mode;
  setCurrentMode: SetState<Mode>;
}

function TypingTest({ currentMode, setCurrentMode }: Props) {
  const { currentTheme } = useTheme();
  const [textToDisplay, setTextToDisplay] = useState<TextCharacter[]>([]);
  const [timer, setTimer] = useState<number>(
    (currentMode.additionalOptions as TimeMode).selectedTimeLimit || 60
  );

  function normalizeText(text: string) {
    return text.split('').map((letter) => ({
      value: letter,
      currentColor: currentTheme.text.neutral,
      colors: currentTheme.text,
    }));
  }

  async function fetchRandomWords() {
    try {
      const { error, data } = await fetchWords(
        false,
        false,
        (currentMode.additionalOptions as WordsMode).selectedNumberOfWords
      );

      if (error) throw new Error(error);

      const preparedText = normalizeText(data);

      setTextToDisplay(preparedText);
    } catch (error) {
      console.error(error);
    }
  }

  const { currentLetterIndex, wpmResult, numberOfTypedWords, restart } =
    useTyping(textToDisplay, setTextToDisplay);

  function restartTest() {
    restart();

    setTextToDisplay((prevText) =>
      prevText.map((letter) => ({
        ...letter,
        value: '',
        currentColor: currentTheme.text.neutral,
      }))
    );

    fetchRandomWords();
  }

  useEffect(() => {
    if (currentMode.selectedMode === Modes.TIME) {
      setTimer((currentMode.additionalOptions as TimeMode).selectedTimeLimit);
    }

    currentLetterIndex.current = 0;

    switch (currentMode.selectedMode) {
      case Modes.WORDS:
        fetchRandomWords();
        break;

      default:
        setTextToDisplay(
          normalizeText(
            'djasldjalsjdal;skjda;lsjdl;asj dlaskj dlaskjd laskjdaslkjdaslkjdlaskjd asldlaksjd'
          )
        );
        break;
    }

    if (currentMode.selectedMode === Modes.WORDS) {
      fetchRandomWords();
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
        />
      )}

      <RestartButton action={restartTest} tabIndex={0} />
    </div>
  );
}

export default TypingTest;

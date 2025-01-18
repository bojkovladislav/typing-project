import { useEffect, useState } from 'react';
import TypingField from '../../components/TypingField/TypingField';
import useTyping from '../../hooks/useTyping';
import RestartButton from '../../components/RestartButton/RestartButton';
import axios from 'axios';
import { TextCharacter } from '../../types/typing';
import { useTheme } from '../../hooks/useTheme';

function TypingTest() {
  const { currentTheme } = useTheme();
  const [textToDisplay, setTextToDisplay] = useState<TextCharacter[]>([]);

  function normalizeText(text: string) {
    return text.split('').map((letter) => ({
      value: letter,
      currentColor: currentTheme.text.neutral,
      colors: currentTheme.text,
    }));
  }

  async function fetchRandomWords() {
    try {
      const REQUESTED_URL = 'https://random-word-api.vercel.app/api?words=2';

      const response = await axios.get(REQUESTED_URL);

      const preparedText = normalizeText(response.data.join(' '));

      setTextToDisplay(preparedText);
    } catch (error) {
      console.error(error);
    }
  }

  const [currentLetterIndex, wpmResult, restart] = useTyping(
    textToDisplay,
    setTextToDisplay
  );

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
    fetchRandomWords();
  }, []);

  console.log(wpmResult);

  return (
    <div className="flex flex-col gap-10 items-center">
      {wpmResult !== null ? (
        <p>{`Your result is ${wpmResult} words per minute!`}</p>
      ) : (
        <TypingField
          text={textToDisplay}
          currentLetterIndex={currentLetterIndex.current}
        />
      )}

      <RestartButton action={restartTest} />
    </div>
  );
}

export default TypingTest;

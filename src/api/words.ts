import axios from 'axios';
import { NumberOfWords } from '../types/configurationBar';

const API_URL: string = 'https://random-word-api.vercel.app/api?words';

export async function fetchWords(
  punctuation: boolean,
  numbers: boolean,
  numberOfWords: NumberOfWords[number]
) {
  function generateRandomNumbers(
    quantity: number,
    max: number,
    min = 0
  ): number[] {
    return Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  }

  function integrateNumbers(words: string[]) {
    const percentage = 25;
    const numberOfNumbers = Math.floor((words.length / 100) * percentage);

    const numbers = generateRandomNumbers(numberOfNumbers, 1000);
    const numberPositions = generateRandomNumbers(
      numberOfNumbers,
      words.length - 1
    );

    return words
      .map((word, index) => {
        if (numberPositions.includes(index)) {
          return numbers.shift();
        }

        return word;
      })
      .join(' ');
  }

  const resultData = {
    error: '',
    message: '',
    data: '',
  };

  try {
    const preparedUrl = `${API_URL}=${numberOfWords}`;
    const response = await axios.get<string[]>(preparedUrl);

    resultData.message = 'The data has been successfully fetched';

    const words = response.data;

    if (numbers) {
      resultData.data = integrateNumbers(words);
    } else {
      resultData.data = response.data.join(' ');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error has occurred';

    resultData.message = 'An error occurred while fetching data';
    resultData.error = errorMessage;
  }

  return resultData;
}

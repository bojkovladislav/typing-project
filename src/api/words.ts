import axios from 'axios';
import { NumberOfWords } from '../types/configurationBar';

const API_URL: string = 'https://random-word-api.vercel.app/api?words';

export async function fetchWords(
  punctuation: boolean,
  numbers: boolean,
  numberOfWords: NumberOfWords[number]
) {
  const resultData = {
    error: '',
    message: '',
    data: '',
  };

  try {
    const preparedUrl = `${API_URL}=${numberOfWords}`;
    const response = await axios.get<string[]>(preparedUrl);

    resultData.message = 'The data has been successfully fetched';
    resultData.data = response.data.join(' ');
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

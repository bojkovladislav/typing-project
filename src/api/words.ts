import { NumberOfWords } from '../types/configurationBar';
import { apiMiddleware } from './apiMiddleware';
import { getData } from '.';

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

  function calculatePercentageValue(
    baseValue: number,
    percentage: number = 25
  ) {
    return Math.floor((baseValue / 100) * percentage);
  }

  function getRandomSigns(
    quantity: number,
    max: number,
    punctuationSigns: string[]
  ) {
    return generateRandomNumbers(quantity, max).map(
      (number) => punctuationSigns[number]
    );
  }

  function getCorrectWordWithSign(word: string, sign: string) {
    if (sign === `'` || sign === '"') {
      return `${sign}${word}${sign}`;
    }

    if (sign === '-') {
      return `${word} -`;
    }

    return `${word}${sign}`;
  }

  function integratePunctuation(words: string[]) {
    const numberOfPunctuationSigns = calculatePercentageValue(words.length);

    const punctuationSigns = [',', '.', '-', '"', `'`];

    const punctuationPositions = generateRandomNumbers(
      numberOfPunctuationSigns,
      words.length - 1
    );
    const signs = getRandomSigns(
      numberOfPunctuationSigns,
      punctuationSigns.length - 1,
      punctuationSigns
    );

    return words.map((word, index) => {
      if (punctuationPositions.includes(index)) {
        return getCorrectWordWithSign(word, signs.shift() as string);
      }

      return word;
    });
  }

  function insertRandomNumbers(words: string[]) {
    const countOfNumbers = calculatePercentageValue(words.length);

    const randomNumbers = generateRandomNumbers(countOfNumbers, 1000);
    const randomPositions = generateRandomNumbers(
      countOfNumbers,
      words.length - 1
    );

    return words.map((word, index) =>
      randomPositions.includes(index) ? String(randomNumbers.shift()) : word
    );
  }

  return apiMiddleware(async () => {
    const preparedUrl = `${API_URL}=${numberOfWords}`;
    const response = await getData(preparedUrl);

    let words = response.data;

    if (numbers) {
      words = insertRandomNumbers(words);
    }

    if (punctuation) {
      words = integratePunctuation(words);
    }

    return words.join(' ');
  });
}

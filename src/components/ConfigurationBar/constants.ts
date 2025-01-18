import {
  Modes,
  QuoteMode,
  TextModes,
  TimeMode,
  WordsMode,
} from '../../types/configurationBar';

export const defaultAdditionalOptions = {
  punctuation: false,
  numbers: false,
};

export const wordsOptions: WordsMode = {
  lengthToSelect: [10, 25, 50, 100],
  ...defaultAdditionalOptions,
  selectedNumberOfWords: 10,
};

export const timeOptions: TimeMode = {
  secondsToChooseFrom: [15, 30, 60, 120],
  ...defaultAdditionalOptions,
  selectedTimeLimit: 15,
};

export const quoteOptions: QuoteMode = {
  form: ['all', 'short', 'medium', 'long'],
  selectedQuoteLength: 'all',
};

export const defaultOptions: TextModes = {
  [Modes.WORDS]: wordsOptions,
  [Modes.TIME]: timeOptions,
  [Modes.QUOTE]: quoteOptions,
};

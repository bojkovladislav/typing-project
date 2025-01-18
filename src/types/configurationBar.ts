export { Modes } from './enums';
import { Modes } from './enums';

export interface Mode {
  selectedMode: Modes;
  additionalOptions: TextModes[Modes];
}

export type QuoteLength = ['all', 'short', 'medium', 'long'];
export type NumberOfWords = [10, 25, 50, 100];
export type SecondOptions = [15, 30, 60, 120];

export interface WordsMode {
  lengthToSelect: NumberOfWords;
  punctuation: boolean;
  numbers: boolean;
  selectedNumberOfWords: NumberOfWords[number];
}

export interface TimeMode {
  secondsToChooseFrom: SecondOptions;
  punctuation: boolean;
  numbers: boolean;
  selectedTimeLimit: SecondOptions[number];
}

export interface QuoteMode {
  form: QuoteLength;
  selectedQuoteLength: QuoteLength[number];
}

export type TextModes = {
  [Modes.WORDS]: WordsMode;
  [Modes.TIME]: TimeMode;
  [Modes.QUOTE]: QuoteMode;
};

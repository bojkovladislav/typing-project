import { Mode } from './types/configurationBar';
import { Modes } from './types/enums';

export const THEMES = [
  {
    primary: 'white',
    correctChar: 'green',
    wrongChar: 'red',
  },
  {
    primary: 'lightGreen',
    correctChar: 'yellow',
    wrongChar: 'blue',
  },
];

export const defaultMode: Mode = {
  selectedMode: Modes.WORDS,
  additionalOptions: {
    lengthToSelect: [10, 25, 50, 100],
    punctuation: false,
    numbers: false,
    selectedNumberOfWords: 10,
  },
};

export const KeysToIgnore = ['Alt', 'Control', 'Shift', 'Meta', 'Tab'];

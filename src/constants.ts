import { Mode } from './types/configurationBar';
import { Modes } from './types/enums';
export const THEMES = [
  {
    name: 'Light',
    interface: {
      primaryColor: '#ffffff',
      secondaryColor: '#f5f5f5',
      tertiaryColor: '#e0e0e0',
      selectedColor: '#81c784',
    },
    text: {
      neutral: '#000000',
      correct: '#4caf50',
      incorrect: '#f44336',
    },
  },

  {
    name: 'Dark',
    interface: {
      primaryColor: '#121212',
      secondaryColor: '#073642',
      tertiaryColor: '#586e75',
      selectedColor: '#81c784',
    },
    text: {
      neutral: '#ffffff',
      correct: '#81c784',
      incorrect: '#e57373',
    },
  },

  {
    name: 'Solarized',
    interface: {
      primaryColor: '#002b36',
      secondaryColor: '#073642',
      selectedColor: '#81c784',
      tertiaryColor: '#586e75',
    },
    text: {
      neutral: '#839496',
      correct: '#2aa198',
      incorrect: '#dc322f',
    },
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

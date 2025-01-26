import { Mode } from './types/configurationBar';
import { Modes } from './types/enums';
export const THEMES = [
  {
    name: 'Light',
    interface: {
      primaryColor: '#ffffff',
      secondaryColor: '#eaeef2',
      tertiaryColor: '#586e75',
      selectedColor: '#5cd3a3',
    },
    text: {
      neutral: '#2d3436',
      correct: '#4caf50',
      incorrect: '#e74c3c',
    },
  },
  {
    name: 'Dark',
    interface: {
      primaryColor: '#181a1b',
      secondaryColor: '#1d1f20',
      tertiaryColor: '#d1d5da',
      selectedColor: '#5cd3a3',
    },
    text: {
      neutral: '#d1d5da',
      correct: '#5cd3a3',
      incorrect: '#e57373',
    },
  },
  {
    name: 'Solarized',
    interface: {
      primaryColor: '#002b36',
      secondaryColor: '#073642',
      tertiaryColor: '#586e75',
      selectedColor: '#5cd3a3',
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

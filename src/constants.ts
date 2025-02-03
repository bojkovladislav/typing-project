import { Mode } from './types/configurationBar';
import { Modes } from './types/enums';

export const THEMES = [
  {
    name: 'Light',
    interface: {
      primaryColor: '#ffffff',
      secondaryColor: '#f2f3f5',
      tertiaryColor: '#c5c8cc',
      selectedColor: '#4bd4a6',
    },
    text: {
      neutral: '#2d2f34',
      correct: '#27ae60',
      incorrect: '#e74c3c',
    },
  },
  {
    name: 'Dark',
    interface: {
      primaryColor: '#0f111a',
      secondaryColor: '#181a1f',
      tertiaryColor: '#c7cbd1',
      selectedColor: '#4bd4a6',
    },
    text: {
      neutral: '#c7cbd1',
      correct: '#4bd4a6',
      incorrect: '#e57373',
    },
  },
  {
    name: 'Solarized',
    interface: {
      primaryColor: '#002b36',
      secondaryColor: '#073642',
      tertiaryColor: '#586e75',
      selectedColor: '#2aa198',
    },
    text: {
      neutral: '#839496',
      correct: '#2aa198',
      incorrect: '#dc322f',
    },
  },
  {
    name: 'Dracula',
    interface: {
      primaryColor: '#282a36',
      secondaryColor: '#44475a',
      tertiaryColor: '#6272a4',
      selectedColor: '#50fa7b',
    },
    text: {
      neutral: '#f8f8f2',
      correct: '#50fa7b',
      incorrect: '#ff5555',
    },
  },
  {
    name: 'Gruvbox Dark',
    interface: {
      primaryColor: '#282828',
      secondaryColor: '#3c3836',
      tertiaryColor: '#ebdbb2',
      selectedColor: '#fabd2f',
    },
    text: {
      neutral: '#ebdbb2',
      correct: '#b8bb26',
      incorrect: '#fb4934',
    },
  },
  {
    name: 'Future Funk',
    interface: {
      primaryColor: '#2e1a47',
      secondaryColor: '#3a245c',
      tertiaryColor: '#d884f3',
      selectedColor: '#ff79c6',
    },
    text: {
      neutral: '#f8f8f2',
      correct: '#ff79c6',
      incorrect: '#ff5555',
    },
  },
  {
    name: 'Horizon',
    interface: {
      primaryColor: '#1c1e26',
      secondaryColor: '#232530',
      tertiaryColor: '#e95678',
      selectedColor: '#fab795',
    },
    text: {
      neutral: '#d5d8da',
      correct: '#ef6b73',
      incorrect: '#eb564b',
    },
  },
  {
    name: 'Nord',
    interface: {
      primaryColor: '#2e3440',
      secondaryColor: '#3b4252',
      tertiaryColor: '#88c0d0',
      selectedColor: '#8fbcbb',
    },
    text: {
      neutral: '#eceff4',
      correct: '#a3be8c',
      incorrect: '#bf616a',
    },
  },
  {
    name: 'Monokai',
    interface: {
      primaryColor: '#272822',
      secondaryColor: '#3e3d32',
      tertiaryColor: '#f8f8f2',
      selectedColor: '#f92672',
    },
    text: {
      neutral: '#f8f8f2',
      correct: '#a6e22e',
      incorrect: '#f92672',
    },
  },
  {
    name: 'Cyberpunk',
    interface: {
      primaryColor: '#000000',
      secondaryColor: '#1a1a1a',
      tertiaryColor: '#ff0099',
      selectedColor: '#00ffff',
    },
    text: {
      neutral: '#ffffff',
      correct: '#00ff00',
      incorrect: '#ff0000',
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

export const KeysToIgnore = ['Alt', 'Control', 'Shift', 'Meta', 'Tab', 'Enter'];

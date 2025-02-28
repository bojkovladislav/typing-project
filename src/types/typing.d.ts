import { ThemeCharacterCurrentColor, ThemeColors } from './common';

interface TextCharacter {
  value: string;
  currentColor: ThemeCharacterCurrentColor;
  colors: ThemeColors['text'];
}

interface TextData {
  numberOfWords: number;
  text: TextCharacter[];
}

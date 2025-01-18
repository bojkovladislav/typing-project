import { Dispatch, SetStateAction } from 'react';
import { THEMES } from '../constants';

type ThemeColors = (typeof THEMES)[number];
type ThemeCharacterCurrentColor =
  ThemeColors['text'][keyof ThemeColors['text']];
type SetState<T> = Dispatch<SetStateAction<T>>;

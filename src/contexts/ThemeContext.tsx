import { createContext, useEffect, useState, ReactNode } from 'react';
import { THEMES } from '../constants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { ThemeColors } from '../types/common';

interface ThemeContextType {
  currentTheme: ThemeColors;
  changeTheme: (newTheme: ThemeColors) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}
export function ThemeProvider({ children }: Props) {
  function getTheme(): ThemeColors {
    const themeFromLocalStorage: ThemeColors | null =
      getLocalStorageItem('theme');

    return themeFromLocalStorage || THEMES[0];
  }

  const [theme, setTheme] = useState<ThemeColors>(getTheme);

  useEffect(() => {
    document.body.style.background = theme.interface.primaryColor;
  }, [theme]);

  function changeTheme(newTheme: ThemeColors) {
    setTheme(newTheme);
    setLocalStorageItem('theme', newTheme);
  }

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

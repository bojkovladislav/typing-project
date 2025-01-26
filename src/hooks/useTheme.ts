import { useEffect, useState } from 'react';
import { THEMES } from '../constants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';

export function useTheme() {
  function getTheme() {
    const themeFromLocalStorage = getLocalStorageItem('theme');
    const defaultTheme = THEMES[2];

    if (!themeFromLocalStorage) {
      setLocalStorageItem('theme', defaultTheme);

      return defaultTheme;
    }

    return themeFromLocalStorage as (typeof THEMES)[number];
  }

  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const primaryColorClass = theme.interface.primaryColor;

    document.body.style.background = primaryColorClass;
  }, [theme]);

  function changeTheme(newTheme: (typeof THEMES)[number]): void {
    setTheme(newTheme);
  }

  return { currentTheme: theme, changeTheme };
}

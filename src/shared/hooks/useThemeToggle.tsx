import { useEffect, useState } from 'react';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

/**
 * Manage theme toggling between light and dark modes.
 *
 * @returns
 * - `theme` {ThemeType}: The current theme, either `Theme.Light` or `Theme.Dark`.
 * - `toggleTheme` {Function}: A function to toggle the theme between light and dark modes.
 */
export function useThemeToggle() {
  const { getItem, setItem } = useLocalStorage();

  const Theme = {
    light: 'light',
    dark: 'dark',
  } as const;

  type ThemeType = (typeof Theme)[keyof typeof Theme];

  const [theme, setTheme] = useState<ThemeType>(() =>
    getItem('theme', Theme.dark)
  );

  useEffect(() => {
    document.body.dataset.theme = theme;

    setItem('theme', theme);
  }, [theme, setItem]);

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === Theme.light ? Theme.dark : Theme.light
    );
  }

  return { theme, toggleTheme };
}

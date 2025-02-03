import {
  DarkModeIcon,
  DarkModeLogoIcon,
  LightModeIcon,
  LightModeLogoIcon,
} from '@shared/icons/index';
import './header.scss';
import { useThemeToggle } from '@shared/hooks/useThemeToggle';

export function Header() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <header className='header'>
      {theme === 'light' ? <LightModeLogoIcon /> : <DarkModeLogoIcon />}

      <button
        onClick={toggleTheme}
        className='header__theme-toggle'
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </header>
  );
}

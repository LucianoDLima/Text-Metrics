import {
  DarkModeIcon,
  DarkModeLogoIcon,
  LightModeIcon,
  LightModeLogoIcon,
} from '@shared/icons/index';
import './header.scss';
import { useThemeToggle } from '@shared/hooks';

export function Header() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <header className='header' data-testid='header'>
      {theme === 'light' ? (
        <LightModeLogoIcon data-testid='light-logo' />
      ) : (
        <DarkModeLogoIcon data-testid='dark-logo' />
      )}

      <button
        onClick={toggleTheme}
        className='header__theme-toggle'
        data-testid='theme-toggle'
      >
        {theme === 'light' ? (
          <DarkModeIcon data-testid='dark-mode-icon' />
        ) : (
          <LightModeIcon data-testid='light-mode-icon' />
        )}
      </button>
    </header>
  );
}

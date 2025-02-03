import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import { useThemeToggle } from '@shared/hooks/themeToggle/useThemeToggle';
import { Header } from './header';
import '@testing-library/jest-dom/vitest';

vi.mock('@shared/hooks/themeToggle/useThemeToggle', () => ({
  useThemeToggle: vi.fn(),
}));

describe('Header component with theme behavious', () => {
  it('should render the light mode logo and dark mode toggle when theme is light', () => {
    (useThemeToggle as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<Header />);

    expect(screen.getByTestId('light-logo')).toBeInTheDocument();
    expect(screen.getByTestId('dark-mode-icon')).toBeInTheDocument();
  });

  it('should render the dark mode logo and light mode toggle when theme is dark', () => {
    (useThemeToggle as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    render(<Header />);

    expect(screen.getByTestId('dark-logo')).toBeInTheDocument();
    expect(screen.getByTestId('light-mode-icon')).toBeInTheDocument();
  });

  it('should call toggleTheme when button is clicked', () => {
    const mockToggleTheme = vi.fn();
    (useThemeToggle as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<Header />);

    const toggleButton = screen.getByTestId('theme-toggle');
    fireEvent.click(toggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});

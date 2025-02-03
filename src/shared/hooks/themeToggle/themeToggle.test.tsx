import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useThemeToggle } from './useThemeToggle';

vi.mock('@shared/hooks/localStorage/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getItem: vi.fn((_, defaultValue: string) => defaultValue),
    setItem: vi.fn(),
  }),
}));

describe('useThemeToggle Hook', () => {
  it('should initialize with the default theme (dark)', () => {
    const { result } = renderHook(() => useThemeToggle());

    expect(result.current.theme).toBe('dark');
    expect(document.body.dataset.theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    const { result } = renderHook(() => useThemeToggle());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(document.body.dataset.theme).toBe('light');
  });

  it('should toggle theme to light then back to dark', () => {
    const { result } = renderHook(() => useThemeToggle());

    act(() => {
      result.current.toggleTheme();
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.body.dataset.theme).toBe('dark');
  });
});

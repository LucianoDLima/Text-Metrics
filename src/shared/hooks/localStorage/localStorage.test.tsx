import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should store data in localStorage', () => {
    const { setItem } = useLocalStorage();
    setItem('theme', 'dark');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'theme',
      JSON.stringify('dark')
    );

    expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'));
  });

  it('should retrieve existing data from localStorage', () => {
    localStorage.setItem('theme', JSON.stringify('storedValue'));
    const { getItem } = useLocalStorage();

    const result = getItem('theme', 'dark');
    expect(result).toBe('storedValue');
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
  });

  it('should return the default value if key does not exist', () => {
    const { getItem } = useLocalStorage();

    const result = getItem('theme', 'dark');
    expect(result).toBe('dark');
  });
});

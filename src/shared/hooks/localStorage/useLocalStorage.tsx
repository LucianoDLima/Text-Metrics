/**
 * Get and store data in localStorage.
 *
 * @returns
 * - `getItem<T>(key: string, initialValue: T): T`: Retrieve an item from `localStorage`. If the item does not exist, return the given `initialValue`.
 * - `setItem<T>(key: string, value: T): void`: Store a value in `localStorage`.
 */
export function useLocalStorage() {
  /**
   * Retrieve data from `localStorage`.
   *
   * @param key - The key of the item.
   * @param value - The value to retrieve. Return default value if empty
   */
  function getItem<T>(key: string, value: T): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  }

  /**
   * Store data in `localStorage`.
   *
   * @param key - The key of the item.
   * @param value - The value to store.
   */
  function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { getItem, setItem };
}

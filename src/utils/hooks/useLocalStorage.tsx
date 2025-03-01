import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: string = '') {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      let currentValue = initialValue;

      try {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            currentValue = JSON.parse(item);
          } catch {
            currentValue = item;
          }
        }
      } catch (error) {
        console.error('Error reading localStorage:', error);
      }

      return currentValue;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const valueToStore =
          typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export { useLocalStorage };

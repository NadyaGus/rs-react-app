import { useEffect, useState } from 'react';

function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    let currentValue = '';

    try {
      currentValue = localStorage.getItem(key) || '';
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export { useLocalStorage };

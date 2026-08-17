import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue?: any) => {
  const setItem = useCallback((key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const getItem = useCallback(
    (key: string) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        return null;
      }
    },
    [defaultValue],
  );

  const [value, setValue] = useState(getItem(key));

  useEffect(() => {
    // initialize the value from localStorage
    setValue(getItem(key));
  }, [key, getItem]);

  useEffect(() => {
    const storedValue = getItem(key);
    if (storedValue !== value) {
      setItem(key, value);
    }
  }, [value, key, getItem, setItem, defaultValue]);

  useEffect(() => {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const handleUpdate = (event) => {
      if (event.key === key) {
        setValue(getItem(key));
      }
    };
    window.addEventListener('storage', handleUpdate);
    return () => window.removeEventListener('storage', handleUpdate);
  }, [key, getItem]);

  return [value, setValue];
};

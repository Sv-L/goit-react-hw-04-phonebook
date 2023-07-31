import { useState, useEffect } from 'react';

const useLocalStorage = (defaultValue, key) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    if (state.length === 0) {
      localStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;

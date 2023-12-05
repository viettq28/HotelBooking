import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [storage, setStorage] = useState(localStorage.getItem(key));

  useEffect(() => {
    const handleChangeStorage = () => {
      setStorage(localStorage.getItem(key));
    };
    window.addEventListener('storage', handleChangeStorage);

    return () => window.removeEventListener('storage', handleChangeStorage);
  });

  return storage;
};

export default useLocalStorage;

import { useState, useCallback } from 'react';

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, applyData, options, handleError) => {
      setError(null);
      setIsLoading(true);

      try {
        const res = await fetch(url, options ? options : { method: 'GET' });
        // if (!res.ok) {
        //   throw new Error('Fetch failed');
        // }
        const data = await res.json();
        if (res.status >= 400) {
          throw new Error(data.message || 'Fetch failed');
        }

        applyData(data);
      } catch (error) {
        setError(error.message || 'Something went wrong');
        handleError && handleError(error);
      }

      setIsLoading(false);
    },
    []
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;

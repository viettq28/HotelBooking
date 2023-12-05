import { useState, useEffect, useCallback } from 'react';
import DataBankContext from './DataBankContext';
import useHttp from '../hooks/useHttp';

const baseUrl = 'http://localhost:5000';
const token = localStorage.getItem('TOKEN');
const urls = {
  transactionsLimit: token ? `${baseUrl}/${token}/transaction?limit=8` : null,
  transactions: token ? `${baseUrl}/${token}/transaction` : null,
  users: `${baseUrl}/user`,
  hotels: `${baseUrl}/hotel`,
  rooms: `${baseUrl}/room`,
};

const DataBankContextProvider = ({ children }) => {
  const { sendRequest } = useHttp();
  const [isReload, setIsReload] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [bank, setBank] = useState({});

  useEffect(() => {
    if (isInitial) {
      (async () => {
        try {
          const data = await Promise.all(
            Object.values(urls).map(async (url) => {
              if (!url) return null;
              const res = await fetch(url);
              return res.json();
            })
          );
          const final = Object.keys(urls).reduce((acc, key, i) => {
            acc[key] = data[i];
            return acc;
          }, {});
          setBank(final);
          setIsInitial(false);
        } catch (error) {
          console.error(error);
        }
      })();
    } else if (isReload) {
      sendRequest(urls[isReload], (data) => {
        if (isReload === 'transactions') {
          sendRequest(urls['transactionsLimit'], (transactionsLimitData) => {
            setBank((prev) => {
              return {
                ...prev,
                transactions: data,
                transactionsLimit: transactionsLimitData,
              };
            });
          });
        }
        setBank((prev) => {
          return {
            ...prev,
            [isReload]: data,
          };
        });
        setIsReload(false);
      });
    }
  }, [sendRequest, isReload, isInitial]);

  const reloadBank = useCallback((key) => setIsReload(key), []);

  return (
    <DataBankContext.Provider value={{ isInitial, bank, reloadBank, urls }}>
      {children}
    </DataBankContext.Provider>
  );
};
export default DataBankContextProvider;

import { useState, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import useLocalStorage from '../hooks/useLocalStorage';
import LoginUserContext from './LoginUserContext';

const LoginUserContextProvider = ({ children }) => {
  const storage = useLocalStorage('TOKEN');
  const { sendRequest } = useHttp();
  const [curUser, setCurUser] = useState(null);
  useEffect(() => {
    const applyData = (data) => {
      setCurUser(data.data.user);
    };
    if (!!storage) {
      sendRequest(`http://localhost:5000/user/${storage}`, applyData);
    } else {
      setCurUser(null);
    }
  }, [storage, sendRequest]);
  return (
    <LoginUserContext.Provider value={curUser}>
      {children}
    </LoginUserContext.Provider>
  );
};
export default LoginUserContextProvider;

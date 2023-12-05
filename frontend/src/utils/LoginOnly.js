import { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoginUserContext from '../context/LoginUserContext';

const LoginOnly = ({forAdmin}) => {
  const navigate = useNavigate();
  const isLogin = useContext(LoginUserContext)?.[!!forAdmin ? 'isAdmin' : '_id'];

  useEffect(() => {
    if (!isLogin) return navigate('/');
  }, [isLogin, navigate]);
  return <Outlet />;
};
export default LoginOnly;

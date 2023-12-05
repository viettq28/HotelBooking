import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoginUserContext from "../context/LoginUserContext";

const PreventAuth = () => {
  const isAuth = useContext(LoginUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    isAuth && navigate('/')
  }, [isAuth, navigate]);

  return <Outlet />
};
export default PreventAuth
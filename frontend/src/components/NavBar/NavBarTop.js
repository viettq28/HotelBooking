import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginUserContext from '../../context/LoginUserContext';
import classes from './NavBarTop.module.css';

// NavBarTop chứa tên page và 2 nút Register + Login
const NavBarTop = () => {
  const curUser = useContext(LoginUserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };
  return (
    <div className={`text-white py-2 mb-3 ${classes['navbar-top']}`}>
      <p className="my-lg-0 me-lg-auto">
        <Link to="/">Booking Website</Link>
      </p>
      {curUser ? (
        <div>
          <span className="me-4">{curUser.username}</span>
          <Link to={curUser.isAdmin ? "/dashboard" : "/transaction"}>
            <button
              type="button"
              className={`${classes.button} btn btn-light me-2`}
            >
              {curUser.isAdmin ? 'Dashboard' : 'Transaction'}
            </button>
          </Link>
          <button
            type="button"
            className={`${classes.button} btn btn-light me-2`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/auth/register">
            <button
              type="button"
              className={`${classes.button} btn btn-light me-2`}
            >
              Register
            </button>
          </Link>

          <Link to="/auth/login">
            <button type="button" className={`${classes.button} btn btn-light`}>
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBarTop;

import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataBankContext from '../../context/DataBankContext';
import Button from '../../UI/Button';
import Container from '../../UI/Container';
import classes from './Auth.module.css';
import useHttp from '../../hooks/useHttp';

const Auth = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const { reloadBank } = useContext(DataBankContext);
  const { auth } = useParams();
  const { sendRequest } = useHttp();
  const isLogin = auth === 'login';
  const isRegister = auth === 'register';
  const url = `http://localhost:5000/user/${auth}/`;
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = input;
    if (!username.length || !password.length) {
      window.alert('Missing input!!!');
    } else {
      const applyData = (data) => {
        localStorage.setItem('TOKEN', data.data.token);
        reloadBank('transactions');
        window.dispatchEvent(new Event('storage'));
        return window.location.replace('/');
      };
      const handleError = (err) => {
        window.alert(err);
      };
      sendRequest(url, applyData, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }, handleError);
    }
  };

  return (
    <Container>
      <form className={classes['form']} onSubmit={handleSubmit}>
        <p>{isLogin ? 'Login' : isRegister && 'Sign up'}</p>
        <input
          type="test"
          name="username"
          // defaultValue=""
          value={input.username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          // defaultValue=""
          value={input.password}
          onChange={handleChange}
        ></input>
        <Button
          type="submit"
          title={isLogin ? 'Login' : isRegister && 'Create Acount'}
        ></Button>
      </form>
    </Container>
  );
};
export default Auth;

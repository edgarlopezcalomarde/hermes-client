import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './login.css';
import LOG_IN from '../../graphql/mutations/LOG_IN';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      console.log(error);
      // setErrorMessage(error.graphQLErrors[0].message);
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const { token } = result.data.login;
      localStorage.setItem('current-user-token', token);
      localStorage.setItem('currentUser', JSON.stringify(result.data.login));
      navigate('/chatlist');
    }
  }, [result.data]);

  const handleLogIn = async () => {
    login({ variables: { username, password } });
  };

  return (
    <div className="login">
      <div style={{ color: 'red' }}>{errorMessage}</div>

      <div className="box">
        <div className="logo">Hermes</div>

        <div>
          <p className="title">Username: </p>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="input"
          />
        </div>

        <div>
          <p className="title">Password: </p>
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="input"
          />
        </div>

        <button
          className="btnLogin"
          onClick={handleLogIn}
          onKeyDown={handleLogIn}
          type="submit"
        >
          Log In
        </button>
      </div>

      <div
        role="button"
        onClick={() => navigate('/register')}
        onKeyDown={() => navigate('/register')}
        tabIndex={0}
        className="linkToRegister"
      >
        I don't have an account yet
      </div>
    </div>
  );
}

export default Login;

import React, { useContext, useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOG_IN } from '../../mutations/LOG_IN';
import './login.css';



function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      localStorage.setItem('currentUser', JSON.stringify(result.data.login));
      navigate('/chatlist');
    }
  }, [result.data]);

  const handleLogIn = async () => {
    login({ variables: { username, password } });
  };




  return (
    <div className="login">

      <div style={{ color: 'red'}}>{errorMessage}</div>

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

        <button className="btnLogin" onClick={handleLogIn}>
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
}

export default Login;

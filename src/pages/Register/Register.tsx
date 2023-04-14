import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

import CREATE_USER from '../../mutations/CREATE_USER';

import './Register.css';

function Register() {
  const [errorMessage, setErrorMessage] = useState('');

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (password !== repeatPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (
        username === '' ||
        name === '' ||
        password === '' ||
        repeatPassword === ''
      ) {
        throw new Error('Debes rellar todos los campos');
      }

      createUser({ variables: { username, name, password } });
      navigate('/', {
        state: { message: 'El usuario a sido creado correctamente' },
      });
    } catch (error: unknown) {
      setErrorMessage(error as string);
    }
  };

  useEffect(() => {}, [result.data]);

  return (
    <div className="register">
      <div style={{ color: 'red' }}>{errorMessage}</div>

      <form className="box" onSubmit={handleRegister}>
        <div className="logo">Hermes</div>

        <div>
          <p className="title">Username: </p>
          <input
            required
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="input"
          />
        </div>

        <div>
          <p className="title">Name: </p>
          <input
            required
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="input"
          />
        </div>

        <div>
          <p className="title">Password: </p>
          <input
            required
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="input"
          />
        </div>

        <div>
          <p className="title">RepeatPassword: </p>
          <input
            required
            type="text"
            value={repeatPassword}
            onChange={({ target }) => setRepeatPassword(target.value)}
            className="input"
          />
        </div>

        <button className="btnRegister" type="submit">
          Sign In
        </button>
      </form>

      <div
        role="button"
        onClick={() => navigate('/')}
        onKeyDown={() => navigate('/')}
        tabIndex={0}
        className="linkToLogin"
      >
        I already have an account <BiLogIn className="logInIcon" />
      </div>
    </div>
  );
}

export default Register;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../contexts/AuthProvider';
import useLocalStorage from '../../utils/useLocalStorage';
import LOG_IN from '../../graphql/mutations/LOG_IN';
import { Button, LoginLayout } from './LoginStyles';
import {
  FormInput,
  FormLabel,
  FormLayout,
  Href,
} from '../../styledComponents/Input';
import { Logo } from '../Register/RegisterStyles';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [, setUser] = useLocalStorage('current-user', '');

  const [login] = useMutation(LOG_IN);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chatlist');
    }
  }, []);

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    const { data } = await login({ variables: { username, password } });

    if (data) {
      setUser(data.login);
      setIsAuthenticated(true);
      navigate('/chatlist');
    }
  };

  return (
    <LoginLayout>
      <FormLayout onSubmit={handleLogIn}>
        <Logo>Hermes</Logo>

        <div>
          <FormLabel>Username: </FormLabel>
          <FormInput
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="input"
          />
        </div>

        <div>
          <FormLabel>Password: </FormLabel>
          <FormInput
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="input"
          />
        </div>

        <Button>Log In</Button>
      </FormLayout>

      <Href
        role="button"
        onClick={() => navigate('/register')}
        onKeyDown={() => navigate('/register')}
        tabIndex={0}
        className="linkToRegister"
      >
        I don't have an account yet
      </Href>
    </LoginLayout>
  );
}

export default Login;

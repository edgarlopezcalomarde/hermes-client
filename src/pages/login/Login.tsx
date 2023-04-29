import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../contexts/AuthProvider';
import useLocalStorage from '../../utils/useLocalStorage';
import LOG_IN from '../../graphql/mutations/LOG_IN';
import Input from '../../components/Input/Input';

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
    <form
      className="flex h-full w-full justify-center items-center"
      onSubmit={handleLogIn}
    >
      <div className="flex flex-col gap-1 mb-6 w-96">
        <h1 className="text-center mb-10 text-6xl font-bold ">Hermes</h1>

        <Input
          id="username"
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="pedrito"
          type="text"
          value={username}
          required
        />

        <Input
          id="password"
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="•••••••••"
          type="password"
          value={password}
          required
        />

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => navigate('/register')}
          className="flex justify-center items-center text-sm font-medium"
        >
          I don't have an account yet
        </button>
      </div>
    </form>
  );
}

export default Login;

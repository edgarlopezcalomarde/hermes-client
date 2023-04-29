import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../contexts/AuthProvider';
import useLocalStorage from '../../utils/useLocalStorage';
import LOG_IN from '../../graphql/mutations/LOG_IN';

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

        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </p>
          <input
            type="text"
            id="email"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="pedrito"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </p>
          <input
            type="password"
            id="password"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="•••••••••"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>

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

import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

import CREATE_USER from '../../graphql/mutations/CREATE_USER';

function Register() {
  const [, setErrorMessage] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (!agreeTerms) {
        throw new Error('Accept the terms and conditions');
      }

      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }

      if (username === '' || password === '' || repeatPassword === '') {
        throw new Error('You must fill, all the fields');
      }

      const { data } = await createUser({
        variables: { username, name: '', password },
      });

      if (data) {
        navigate('/', {
          state: { message: 'The user has been created successfully' },
        });
      }
    } catch (error: unknown) {
      setErrorMessage(error as string);
    }
  };

  return (
    <form
      className="flex h-full w-full justify-center items-center"
      onSubmit={handleRegister}
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

        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm password
          </p>
          <input
            type="password"
            id="confirm_password"
            className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="•••••••••"
            value={repeatPassword}
            onChange={({ target }) => setRepeatPassword(target.value)}
            required
          />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{' '}
            <a
              href="/termsandconditions"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex justify-center items-center text-sm font-medium"
        >
          I already have an account <BiLogIn className="logInIcon" />
        </button>
      </div>
    </form>
  );
}

export default Register;
